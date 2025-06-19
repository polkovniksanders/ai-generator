import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { UserController } from "./user/user.controller";
import { GeneratorController } from "./generator/generator.controller";

// Load env variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// CORS config
const allowedOrigins = ["https://az-opal.vercel.app"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());

// Controllers
const userController = new UserController();
const generateController = new GeneratorController();

// User routes
app.post("/api/users", userController.createUser.bind(userController));
app.get("/api/users", userController.getUsers.bind(userController));
app.get("/api/users/:uuid", userController.getUserByUuid.bind(userController));

// Generator routes
app.get(
  "/api/generate/:uuid",
  generateController.generateCharacter.bind(generateController),
);
app.post(
  "/api/generate-image",
  generateController.generateCharacterImage.bind(generateController),
);

// Start server
async function main() {
  try {
    await prisma.$connect();
    const server = app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("Received SIGINT, shutting down gracefully...");
      await prisma.$disconnect();
      server.close(() => {
        process.exit(0);
      });
    });

    process.on("SIGTERM", async () => {
      console.log("Received SIGTERM, shutting down gracefully...");
      await prisma.$disconnect();
      server.close(() => {
        process.exit(0);
      });
    });
  } catch (e) {
    console.error("Server start error:", e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Fatal error in main:", e);
  process.exit(1);
});
