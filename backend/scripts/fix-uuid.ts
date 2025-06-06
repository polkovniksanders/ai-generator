// scripts/fix-uuid.ts
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
  const usersWithoutUuid = await prisma.user.findMany({
    where: { uuid: null },
  });

  for (const user of usersWithoutUuid) {
    await prisma.user.update({
      where: { id: user.id },
      data: { uuid: randomUUID() },
    });
  }

  console.log(`Обновлено ${usersWithoutUuid.length} записей`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
