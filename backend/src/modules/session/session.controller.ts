import { Request, Response } from 'express';
import { SessionService } from './session.service';

const sessionService = new SessionService();

export class SessionController {
  getSession(req: Request, res: Response): void {
    const info = sessionService.getInfo(req);
    res.json(info);
  }
}
