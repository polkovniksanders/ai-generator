import { Request, Response, NextFunction } from 'express';
import { createHash } from 'crypto';
import { env } from '../../config/env';
import { logger } from '../logger';

interface SessionData {
  count: number;
  cooldownUntil: number | null;
}

const sessions = new Map<string, SessionData>();

const MAX_GENERATIONS = parseInt(env.RATE_LIMIT_MAX, 10);
const COOLDOWN_MS = parseInt(env.RATE_LIMIT_WINDOW_MS, 10);

export function getFingerprint(req: Request): string {
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ??
    req.ip ??
    'unknown';
  const ua = req.headers['user-agent'] ?? '';
  return createHash('sha256').update(`${ip}:${ua}`).digest('hex');
}

export function getSessionData(fingerprint: string): SessionData {
  const session = sessions.get(fingerprint);
  if (!session) return { count: 0, cooldownUntil: null };

  // If cooldown expired — reset
  if (session.cooldownUntil && Date.now() > session.cooldownUntil) {
    sessions.delete(fingerprint);
    return { count: 0, cooldownUntil: null };
  }

  return session;
}

export function incrementSession(fingerprint: string): SessionData {
  const session = getSessionData(fingerprint);
  const newCount = session.count + 1;
  const cooldownUntil = newCount >= MAX_GENERATIONS ? Date.now() + COOLDOWN_MS : null;

  const updated: SessionData = { count: newCount, cooldownUntil };
  sessions.set(fingerprint, updated);
  logger.debug(`Session updated: fingerprint=${fingerprint.slice(0, 8)}... count=${newCount}`);
  return updated;
}

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction): void {
  const fingerprint = getFingerprint(req);
  const session = getSessionData(fingerprint);

  if (session.cooldownUntil && Date.now() < session.cooldownUntil) {
    res.status(429).json({
      error: 'Лимит генераций исчерпан',
      cooldownUntil: session.cooldownUntil,
      retryAfter: Math.ceil((session.cooldownUntil - Date.now()) / 1000),
    });
    return;
  }

  next();
}
