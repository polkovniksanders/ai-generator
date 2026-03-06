import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().default('3001'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  GPTUNNEL_API_KEY: z.string().min(1, 'GPTUNNEL_API_KEY is required'),
  GPTUNNEL_BASE_URL: z.string().url().default('https://gptunnel.ru/v1'),
  GPTUNNEL_TEXT_MODEL: z.string().default('gpt-4o-mini'),
  GPTUNNEL_IMAGE_MODEL: z.string().default('yandex-art'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  RATE_LIMIT_MAX: z.string().default('3'),
  RATE_LIMIT_WINDOW_MS: z.string().default('14400000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
