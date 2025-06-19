import { z } from "zod";

export const createUserSchema = z.object({
  profession: z.string().optional(),
  surname: z.string().min(2, "Фамилия обязательна"),
  name: z.string().min(2, "Имя обязательно"),
  isKnown: z.boolean(),
  age: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z
      .number()
      .int("Возраст должен быть целым числом")
      .nonnegative("Возраст не может быть отрицательным"),
  ),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
