import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов'),
    surname: z.string().min(2, 'Минимум 2 символа').max(50, 'Максимум 50 символов'),
    age: z.coerce
        .number({ invalid_type_error: 'Введите возраст' })
        .int('Только целые числа')
        .min(0, 'Не может быть отрицательным')
        .max(150, 'Максимум 150 лет'),
    profession: z.string().max(100).optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
