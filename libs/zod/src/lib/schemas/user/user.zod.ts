import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";
import { RolesValues } from "@carbon/enum";

export const UserSchema = z
  .object({
    id: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string(),
    lastName: z.string(),
    birthDate: z.date(),

    // { "amount": 1000, date: "2021-01-01"}
    salary: z.any(),
    role: z.nativeEnum(RolesValues),
    entryDate: z.date(),
    experience: z.number(),
    /** TODO here */
    skills: z.any(),
    taskLists: z.any(),
    missions: z.any(),
    userPreferences: z.any(),
    school: z.any(),
    /** TODO here */
  })
  .merge(TimestampSchema);

export const UserParamsSchema = UserSchema.pick({
  entryDate: true,
  firstName: true,
  lastName: true,
  missions: true,
  skills: true,
  taskLists: true,
});

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
export type UserParamsType = z.infer<typeof UserParamsSchema>;
