import { z } from "zod";

export const SkillSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  language: z.string(),

  /** TODO here */
  userSkills: z.any(),
  taskLists: z.any(),
  /** TODO here */
  
  createdAt: z.date(),
  updatedAt: z.date(),
});

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
