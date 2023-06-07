import { z } from "zod";

export const SocietySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  missions: z.any(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const SocietyCreateSchema = SocietySchema.pick({
  name: true,
});

export const SocietyUpdateSchema = SocietySchema.pick({
  name: true,
});

export type SocietyType = z.infer<typeof SocietySchema>;
export type SocietyCreateType = z.infer<typeof SocietyCreateSchema>;
export type SocietyUpdateType = z.infer<typeof SocietyUpdateSchema>;
