import { z, ZodType } from 'zod';
import type { FormFieldName } from '../types/generator.types.ts';

export const UserSchema: ZodType<FormFieldName> = z.object({
    name: z
        .string()
        .min(2, 'Имя корткое')
        .max(50, 'Слишком длинное или это фин?'),
    surname: z
        .string()
        .min(2, 'Короткая фамилия или это чех?')
        .max(50, 'Слишком длинное или это фин?'),
    age: z
        .string()
        .regex(/^\d+$/, 'У каждого человека есть возраст и даже у него')
        .transform(val => Number(val))
        .refine(val => val >= 0 && val <= 999, {
            message: 'Возраст должен быть от 0 до 999',
        }),
    profession: z.string(),
});
