import { Request, Response } from "express";

import { UserService } from "../user/user.service";
import {
  generatePersonDescription,
  generatePersonImage,
} from "./generator.service";

const userService = new UserService();

export class GeneratorController {
  async generateCharacter(req: Request, res: Response): Promise<void> {
    const uuid = req.params.uuid;

    try {
      const user = await userService.getUser(uuid);

      const description = await generatePersonDescription(
        user.name,
        user.surname,
        user.age,
        user.profession,
      );

      res.status(201).json({ description: description });
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }

  async generateCharacterImage(req: Request, res: Response): Promise<void> {
    const description = req.body.description;

    try {
      const image = await generatePersonImage(description);
      res.status(201).json({ image: image });
    } catch (error) {
      res.status(500).json({ error: "Ошибка сервера" });
    }
  }
}
