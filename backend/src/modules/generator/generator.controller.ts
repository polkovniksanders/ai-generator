import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { generatePersonDescription, generatePersonImage } from './generator.service';
import { logger } from '../../shared/logger';

const userService = new UserService();

export class GeneratorController {
  async generateCharacter(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const user = await userService.getUser(uuid);
      if (!user) {
        res.status(404).json({ error: 'Пользователь не найден' });
        return;
      }

      const userInput = { ...user, profession: user.profession ?? undefined };
      const description = user.description ?? (await generatePersonDescription(userInput));
      res.json({ description });
    } catch (err) {
      logger.error('generateCharacter error', { error: (err as Error).message });
      res.status(500).json({ error: 'Ошибка генерации описания' });
    }
  }

  async generateAndSaveImage(req: Request, res: Response): Promise<void> {
    const { uuid } = req.params;

    try {
      const user = await userService.getUser(uuid);
      if (!user) {
        res.status(404).json({ error: 'Пользователь не найден' });
        return;
      }

      // Return cached image if already generated
      if (user.image) {
        res.json({ image: user.image });
        return;
      }

      const description = user.description ?? `${user.name} ${user.surname}, ${user.age} лет`;
      const image = await generatePersonImage(description);

      await userService.saveImage(uuid, image);
      res.json({ image });
    } catch (err) {
      logger.error('generateAndSaveImage error', { error: (err as Error).message });
      res.status(500).json({ error: 'Ошибка генерации изображения' });
    }
  }
}
