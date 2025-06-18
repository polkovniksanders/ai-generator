"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserService {
    async createUser(data) {
        return prisma.user.create({ data });
    }
    async getUser(uuid) {
        return prisma.user.findUnique({
            where: { uuid },
        });
    }
    async getAllUsers() {
        return prisma.user.findMany();
    }
}
exports.UserService = UserService;
