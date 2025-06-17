import { Request, Response } from "express";
import { UserService } from "./user.service";
import { generatePersonDescription } from "../generator/generator.service";

function biasedRandomBoolean(): boolean {
  return Math.random() < 0.85;
}

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, surname, age, profession } = req.body;
      if (!name || !surname || age === undefined || age === null) {
        res.status(400).json({ error: "name, surname и age обязательны" });
        return;
      }

      const user = await userService.createUser({
        name,
        surname,
        age,
        profession,
      });

      const isKnown = biasedRandomBoolean();
      const description = await generatePersonDescription(user);

      user.isKnown = isKnown;
      user.description = description;

      res.status(201).json({ user });
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
