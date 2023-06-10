import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";
import { RolesValues } from "@carbon/enum";
import { TaskListSchema } from "../tasklist";
import { MissionSchema } from "../mission";
import { UserPreferenceSchema } from "./user-preference.zod";
import { SchoolSchema } from "../school";
import { FileSchema } from "../file";
import { UserSkillSchema } from "./user-skill.zod";

export const UserSchema = z
  .object({
    id: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    birthDate: z.string().or(z.date()),
    salary: z.string().or(
      z.array(
        z.object({
          amount: z.number(),
          date: z.string().or(z.date()),
        })
      )
    ),
    role: z.nativeEnum(RolesValues),
    entryDate: z.string().or(z.date()),
    experience: z.number(),
    skills: z.array(UserSkillSchema).optional(),
    taskLists: z.array(TaskListSchema).optional(),
    missions: z.array(MissionSchema).optional(),
    userPreferences: z.array(UserPreferenceSchema).optional(),
    School: z.array(SchoolSchema).optional(),
    avatar: z.string().or(FileSchema).optional(),
  })
  .merge(TimestampSchema);

export const UserParamsSchema = z.object({
  entryDate: UserSchema.shape.entryDate.optional(),
  firstName: UserSchema.shape.firstName.optional(),
  lastName: UserSchema.shape.lastName.optional(),
  skills: z.string().optional(),
  orderBy: z.string().optional(),
  search: z.string().optional(),
});

export const UserCreateSchema = UserSchema.pick({
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  birthDate: true,
});

export const UserUpdateSchema = z.object({
  password: z.string().min(8).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  birthDate: z.string().or(z.date()).optional(),
  experience: z.number().optional(),
  salary: z.number().optional(),
});

export const UserSkillCreateSchema = z.object({
  skillId: z.string(),
  level: z.number(),
});

export const UserPreferenceCreateSchema = z.object({
  description: z.string(),
  isLiked: z.boolean(),
});

export const UserAchievementCreateSchema = z.object({
  achievement: z.string(),
  description: z.string().optional(),
});

export const UserTaskListCreateSchema = z.object({
  taskListId: z.string(),
  status: z.string(),
});

export const UserMissionCreateSchema = z.object({
  missionId: z.string(),
});

export const UserSchoolCreateSchema = z.object({
  schoolId: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
export type UserCreateType = z.infer<typeof UserCreateSchema>;
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
export type UserParamsType = z.infer<typeof UserParamsSchema>;
export type UserSkillCreateType = z.infer<typeof UserSkillCreateSchema>;
export type UserPreferenceCreateType = z.infer<
  typeof UserPreferenceCreateSchema
>;
export type UserAchievementCreateType = z.infer<
  typeof UserAchievementCreateSchema
>;
export type UserTaskListCreateType = z.infer<typeof UserTaskListCreateSchema>;
export type UserMissionCreateType = z.infer<typeof UserMissionCreateSchema>;
export type UserSchoolCreateType = z.infer<typeof UserSchoolCreateSchema>;
