import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  entryDate: z.date(),
  experience: z.number(),
  /** TODO here */
  skills: z.any(),
  taskLists: z.any(),
  missions: z.any(),
  /** TODO here */
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserCreateSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const UserUpdateSchema = UserSchema.pick({
  password: true,
});

export type UserType = z.infer<typeof UserSchema>;
export type UserCreateType = z.infer<typeof UserCreateSchema>;
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
