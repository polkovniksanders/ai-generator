import { PrismaClient, User } from "@prisma/client";
import { CreateUserDto, createUserSchema } from "./user.dto";

const prisma = new PrismaClient();

export class UserService {
  async createUser(user: CreateUserDto): Promise<User> {
    const data: CreateUserDto = createUserSchema.parse(user);
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
