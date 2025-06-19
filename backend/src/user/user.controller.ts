import { Request, Response } from "express";
import { UserService } from "./user.service";
import { generatePersonDescription } from "../generator/generator.service";
import { createUserSchema } from "./user.dto";
import { setIsKnown } from "../utils/setIsKnown";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const parseResult = createUserSchema.safeParse(req.body);
      if (!parseResult.success) {
        res.status(400).json({ error: parseResult.error.errors });
        return;
      }

      const payload = {
        ...parseResult.data,
        isKnown: setIsKnown(),
      };

      const user = await userService.createUser(payload);

      const description = await generatePersonDescription(user);

      res.status(201).json({ user: { ...user, description } });
    } catch (error) {
      console.error("createUser error:", error);
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }

  async getUserByUuid(req: Request, res: Response): Promise<void> {
    try {
      const uuid = req.params.uuid;
      if (!uuid) {
        res.status(400).json({ error: "UUID обязателен" });
        return;
      }
      const user = await userService.getUser(uuid);
      if (!user) {
        res.status(404).json({ error: "Пользователь не найден" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      let users = await userService.getAllUsers();
      users = users.sort((a, b) => b.id - a.id);
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }
}
