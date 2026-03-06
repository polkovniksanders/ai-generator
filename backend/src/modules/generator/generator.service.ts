import { env } from '../../config/env';
import { logger } from '../../shared/logger';
import type { GenerateTextOptions } from './generator.types';

const BASE_URL = env.GPTUNNEL_BASE_URL;
const AUTH = env.GPTUNNEL_API_KEY;

async function gptunnelPost(path: string, body: Record<string, unknown>): Promise<unknown> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      Authorization: AUTH,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`GPTunnel ${path} ${res.status}: ${text}`);
  return JSON.parse(text);
}

export async function generatePersonDescription(user: GenerateTextOptions): Promise<string> {
  const { name, surname, age, profession } = user;

  const prompt = `Сгенерируй краткое, интересное описание человека:
- Имя: ${name} ${surname}
- Возраст: ${age} лет
- Профессия: ${profession || 'не указана'}

Опиши возможные увлечения, черты характера, особенности личности. Пиши живо, с лёгким юмором. Объём: 3-4 предложения.`;

  // Primary: GPTunnel
  try {
    const data = (await gptunnelPost('/chat/completions', {
      model: env.GPTUNNEL_TEXT_MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.8,
    })) as { choices?: { message?: { content?: string } }[] };

    const text = data.choices?.[0]?.message?.content?.trim();
    if (text) {
      logger.info('Text generated via GPTunnel');
      return text;
    }
  } catch (err) {
    logger.warn('GPTunnel text generation failed, trying fallback', {
      error: (err as Error).message,
    });
  }

  // Fallback: HuggingFace Mixtral
  try {
    const response = await fetch(
      'https://hf.space/embed/mistralai/Mixtral-8x7B-Instruct-v0.1/api/predict',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [prompt] }),
        signal: AbortSignal.timeout(15000),
      },
    );
    const result = (await response.json()) as { data?: string[] };
    const text = result.data?.[0]?.trim();
    if (text) {
      logger.info('Text generated via HuggingFace fallback');
      return text;
    }
  } catch (err) {
    logger.warn('HuggingFace fallback failed', { error: (err as Error).message });
  }

  return `${name} ${surname}, ${age} лет${profession ? `, ${profession}` : ''}. Описание временно недоступно.`;
}

export async function generatePersonImage(description: string): Promise<string> {
  const imagePrompt = `Portrait photo of a person. ${description.slice(0, 200)}. Realistic, high quality.`;

  // Primary: GPTunnel async media API
  try {
    const createData = (await gptunnelPost('/media/create', {
      model: env.GPTUNNEL_IMAGE_MODEL,
      prompt: imagePrompt,
      ar: '1:1',
    })) as { id?: string };

    const taskId = createData.id;
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (!taskId) throw new Error('No task ID returned');

    logger.info('GPTunnel image task created', { taskId });

    // Poll for result
    const deadline = Date.now() + 120_000;
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 3000));

      const result = (await gptunnelPost('/media/result', { task_id: taskId })) as {
        status?: string;
        url?: string;
      };

      if (result.status === 'done' && result.url) {
        logger.info('Image generated via GPTunnel');
        return result.url;
      }
      if (result.status === 'error') {
        throw new Error(`Task error: ${JSON.stringify(result)}`);
      }
    }
    throw new Error('GPTunnel image timeout');
  } catch (err) {
    logger.warn('GPTunnel image generation failed, using fallback', {
      error: (err as Error).message,
    });
  }

  // Fallback: Pollinations.ai
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(imagePrompt)}?width=512&height=512&seed=${Math.floor(Math.random() * 1000)}&model=flux&nologo=true`;
  logger.info('Image generated via Pollinations fallback');
  return url;
}
