import { z } from "zod";

export const SkillSchema = z.object({
  username: z.string().min(4).max(18),
});

export type SkillType = z.infer<typeof SkillSchema>;
