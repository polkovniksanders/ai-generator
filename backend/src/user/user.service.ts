import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  async createUser(data: {
    name: string;
    surname: string;
    age: number;
    profession?: string;
  }): Promise<User> {
    return prisma.user.create({ data });
  }

  async getUser(uuid: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { uuid },
    });
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }
}
