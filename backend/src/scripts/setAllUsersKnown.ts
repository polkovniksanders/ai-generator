import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

function biasedRandomBoolean() {
  return Math.random() < 0.85;
}

async function main() {
  const users = await prisma.user.findMany();
  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: { isKnown: biasedRandomBoolean() },
    });
  }
  console.log(
    "Все пользователи обновлены: isKnown случайно с вероятностью 85%",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
