import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { UserController } from "./user/user.controller";
import { logger } from "../utils/logger";
import { PrismaClient } from "@prisma/client";
import { GeneratorController } from "./generator/generator.controller";

dotenv.config();

const app = express();
const userController = new UserController();
const generateController = new GeneratorController();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/api/users", (req, res) => userController.createUser(req, res));
app.get("/api/users", (req, res) => userController.getUsers(req, res));
app.get("/api/users/:uuid", (req, res) =>
  userController.getUserByUuid(req, res),
);

app.get("/api/generate/:uuid", (req, res) =>
  generateController.generateCharacter(req, res),
);
app.post("/api/generate-image", (req, res) =>
  generateController.generateCharacterImage(req, res),
);

const PORT = process.env.PORT!;

async function main() {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  } catch (e) {
    logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
