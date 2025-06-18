"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// scripts/fix-uuid.ts
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
async function main() {
    const usersWithoutUuid = await prisma.user.findMany({
        where: { uuid: null },
    });
    for (const user of usersWithoutUuid) {
        await prisma.user.update({
            where: { id: user.id },
            data: { uuid: (0, crypto_1.randomUUID)() },
        });
    }
    console.log(`Обновлено ${usersWithoutUuid.length} записей`);
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
