export async function generatePersonDescription(user: any): Promise<string> {
  const { name, surname, age, profession } = user;

  const prompt = `
    Сгенерируй краткое, но интересное описание человека на основе следующих данных:
    - Имя: ${name}
    - Фамилия: ${surname}
    - Возраст: ${age || "не указан"}
    - Профессия: ${profession || "не указана"}
    Описание должно включать возможные увлечения, черты характера и профессиональные достижения (если есть данные). Можно с юмором, добавь хобби и характер.
  `;

  const response = await fetch(
    "https://hf.space/embed/mistralai/Mixtral-8x7B-Instruct-v0.1/api/predict",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [prompt] }),
    },
  );
  const result = await response.json();
  return result.data?.[0] || "";
}

export async function generatePersonImage(description: string) {
  const prompt = description;
  const width = 400;
  const height = 400;
  const seed = 42;
  const model = "flux";

  return `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&model=${model}`;
}
