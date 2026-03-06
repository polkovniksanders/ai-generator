import { Request, Response } from 'express';
import { UserService } from './user.service';
import { createUserSchema } from './user.dto';
import { incrementSession, getFingerprint } from '../../shared/middleware/rate-limit';
import { logger } from '../../shared/logger';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    const parseResult = createUserSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.flatten().fieldErrors });
      return;
    }

    try {
      const user = await userService.createUser(parseResult.data);

      // Count generation after successful creation
      const fingerprint = getFingerprint(req);
      const session = incrementSession(fingerprint);

      res.status(201).json({ user, session });
    } catch (err) {
      logger.error('createUser error', { error: (err as Error).message });
      res.status(500).json({ error: 'Ошибка создания пользователя' });
    }
  }

  async getUserByUuid(req: Request, res: Response): Promise<void> {
    try {
      const user = await userService.getUser(req.params.uuid);
      if (!user) {
        res.status(404).json({ error: 'Не найдено' });
        return;
      }
      res.json(user);
    } catch (err) {
      logger.error('getUserByUuid error', { error: (err as Error).message });
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      logger.error('getUsers error', { error: (err as Error).message });
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
}
