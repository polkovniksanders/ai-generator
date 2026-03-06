import express from 'express';
import cors from 'cors';
import path from 'path';
import { env } from './config/env';
import { logger } from './shared/logger';
import { prisma } from './shared/prisma';
import { UserController } from './modules/user/user.controller';
import { GeneratorController } from './modules/generator/generator.controller';
import { SessionController } from './modules/session/session.controller';
import { rateLimitMiddleware } from './shared/middleware/rate-limit';

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN.split(',').map((o) => o.trim()),
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));

// Trust proxy for correct IP behind nginx
app.set('trust proxy', 1);

const userController = new UserController();
const generatorController = new GeneratorController();
const sessionController = new SessionController();

// Session endpoint (no rate limit)
app.get('/api/session', (req, res) => sessionController.getSession(req, res));

// Character routes (POST requires rate limit)
app.post('/api/characters', rateLimitMiddleware, (req, res) =>
  userController.createUser(req, res),
);
app.get('/api/characters', (req, res) => userController.getUsers(req, res));
app.get('/api/characters/:uuid', (req, res) => userController.getUserByUuid(req, res));

// Generator routes
app.get('/api/generate/:uuid', (req, res) =>
  generatorController.generateCharacter(req, res),
);
app.post('/api/characters/:uuid/image', (req, res) =>
  generatorController.generateAndSaveImage(req, res),
);

// Serve frontend static files in production
if (env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '..', 'public');
  app.use(express.static(staticPath));
  app.get(/(.*)/, (_req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

async function main() {
  try {
    await prisma.$connect();
    logger.info('Database connected');

    const server = app.listen(parseInt(env.PORT, 10), () => {
      logger.info(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
    });

    const shutdown = async (signal: string) => {
      logger.info(`${signal} received, shutting down`);
      await prisma.$disconnect();
      server.close(() => process.exit(0));
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    logger.error('Server start failed', { error: (err as Error).message });
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
