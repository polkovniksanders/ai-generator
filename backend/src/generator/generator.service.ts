export async function generatePersonDescription(
  firstName,
  lastName,
  age,
  profession,
) {
  const prompt = `
    Сгенерируй краткое, но интересное описание человека на основе следующих данных:
    - Имя: ${firstName}
    - Фамилия: ${lastName}
    - Возраст: ${age || "не указан"}
    - Профессия: ${profession || "не указана"}
    Описание должно включать возможные увлечения, черты характера и профессиональные достижения (если есть данные). Можешь использовать юмор в ответе
  `;

  const response = await fetch("https://text.pollinations.ai/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      model: "openai",
      private: true, // Response won't appear in public feed
    }),
  });

  const data = await response.text();

  return data;
}

export async function generatePersonImage(description) {
  const prompt = description;
  const width = 500;
  const height = 500;
  const seed = 42;
  const model = "flux";

  const imageUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

  const data = imageUrl;

  return data;
}
