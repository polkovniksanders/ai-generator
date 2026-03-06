import { getFingerprint, getSessionData } from '../../shared/middleware/rate-limit';
import { Request } from 'express';
import { env } from '../../config/env';

const MAX_GENERATIONS = parseInt(env.RATE_LIMIT_MAX, 10);

export class SessionService {
  getInfo(req: Request) {
    const fingerprint = getFingerprint(req);
    const session = getSessionData(fingerprint);

    return {
      count: session.count,
      limit: MAX_GENERATIONS,
      cooldownUntil: session.cooldownUntil,
      canGenerate: !session.cooldownUntil || Date.now() > session.cooldownUntil,
      remaining: Math.max(0, MAX_GENERATIONS - session.count),
    };
  }
}
