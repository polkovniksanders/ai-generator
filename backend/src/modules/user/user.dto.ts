import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое').max(50),
  surname: z.string().min(2, 'Фамилия слишком короткая').max(50),
  age: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().int().min(0).max(150),
  ),
  profession: z.string().max(100).optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
