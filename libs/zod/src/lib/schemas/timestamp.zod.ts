import { z } from "zod";

export const TimestampSchema = z.object({
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type TimestampType = z.infer<typeof TimestampSchema>;
