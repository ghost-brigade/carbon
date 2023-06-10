import { z } from "zod";
import { TaskListSchema } from "../tasklist";
import { TimestampSchema } from "../timestamp.zod";

export const SkillSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    level: z.number().optional(),
    language: z.string().optional().nullable().default(null),
    userSkills: z.any(),
    taskLists: TaskListSchema,
  })
  .merge(TimestampSchema);

export const SkillCreateSchema = SkillSchema.pick({
  name: true,
  language: true,
});

export const SkillUpdateSchema = SkillSchema.pick({
  name: true,
  language: true,
});

export type SkillType = z.infer<typeof SkillSchema>;
export type SkillCreateType = z.infer<typeof SkillCreateSchema>;
export type SkillUpdateType = z.infer<typeof SkillUpdateSchema>;
