import { z } from "zod";

export const SkillSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  language: z.string(),
});

export const SkillCreateSchema = z.object({
  name: z.string(),
  language: z.string(),
});

export type SkillType = z.infer<typeof SkillSchema>;
export type SkillCreateType = z.infer<typeof SkillSchema>;
