import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const UserSchema = z
  .object({
    id: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.date(),
    entryDate: z.date(),
    experience: z.number(),
    /** TODO here */
    skills: z.any(),
    taskLists: z.any(),
    missions: z.any(),
    /** TODO here */
  })
  .merge(TimestampSchema);

export const UserCreateSchema = UserSchema.pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  birthDate: true,
});

export const UserUpdateSchema = UserSchema.pick({
  password: true,
  firstName: true,
  lastName: true,
  birthDate: true,
  experience: true,
  skills: true,
  taskLists: true,
  missions: true,
});

export type UserType = z.infer<typeof UserSchema>;
export type UserCreateType = z.infer<typeof UserCreateSchema>;
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
