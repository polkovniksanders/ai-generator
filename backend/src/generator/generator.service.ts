import { UserProps } from "../user/user.types";

export async function generatePersonDescription(
  user: UserProps,
): Promise<string> {
  const { name, surname, age, profession } = user;

  const prompt = `
    Сгенерируй краткое, но интересное описание человека на основе следующих данных:
    - Имя: ${name}
    - Фамилия: ${surname}
    - Возраст: ${age || "не указан"}
    - Профессия: ${profession || "не указана"}
    Описание должно включать возможные увлечения, черты характера и профессиональные достижения (если есть данные). Можешь использовать юмор в ответе
  `;

  let retryCount = 0;
  while (retryCount < 3) {
    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
        model: "openai",
        private: true,
      }),
    });

    if (response.status === 429) {
      await new Promise((r) => setTimeout(r, 2500));
      retryCount++;
      continue;
    }

    return await response.text();
  }
  throw new Error("Too many requests. Please try again later.");
}

export async function generatePersonImage(description: string) {
  const prompt = description;
  const width = 400;
  const height = 400;
  const seed = 42;
  const model = "flux";

  return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
}
