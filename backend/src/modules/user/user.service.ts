import { User } from '@prisma/client';
import { prisma } from '../../shared/prisma';
import { createUserSchema, type CreateUserDto } from './user.dto';
import { generatePersonDescription } from '../generator/generator.service';
import { logger } from '../../shared/logger';

export class UserService {
  async createUser(input: CreateUserDto): Promise<User> {
    const data = createUserSchema.parse(input);

    const description = await generatePersonDescription(data);

    const user = await prisma.user.create({
      data: { ...data, description },
    });

    logger.info('User created', { uuid: user.uuid });
    return user;
  }

  async getUser(uuid: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { uuid } });
  }

  async saveImage(uuid: string, image: string): Promise<void> {
    await prisma.user.update({ where: { uuid }, data: { image } });
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { id: 'desc' } });
  }
}
