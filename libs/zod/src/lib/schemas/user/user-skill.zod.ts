import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";
import { SkillSchema } from "../skill";
import { UserSchema } from "./user.zod";

export const UserSkillSchema = z
  .object({
    userId: z.string(),
    skillId: z.string(),
    level: z.number().min(1).max(5),
    user: UserSchema,
    skill: SkillSchema,
  })
  .merge(TimestampSchema);

export type UserSkillType = z.infer<typeof UserSkillSchema>;
