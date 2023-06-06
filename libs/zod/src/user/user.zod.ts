import { z } from 'zod';

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

export type UserType = z.infer<typeof UserSchema>;
