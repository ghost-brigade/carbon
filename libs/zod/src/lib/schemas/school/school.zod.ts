import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const SchoolSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    dateStart: z.date(),
    dateEnd: z.date(),
    userId: z.string(),
  })
  .merge(TimestampSchema);

export const SchoolCreateSchema = SchoolSchema.pick({
  name: true,
  description: true,
  dateStart: true,
  dateEnd: true,
  userId: true,
});

export const SchoolUpdateSchema = SchoolSchema.pick({
  name: true,
  description: true,
  dateStart: true,
  dateEnd: true,
});

export type SchoolType = z.infer<typeof SchoolSchema>;
export type SchoolCreateType = z.infer<typeof SchoolCreateSchema>;
export type SchoolUpdateType = z.infer<typeof SchoolUpdateSchema>;
