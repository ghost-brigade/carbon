import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const NewsSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    src: z.string(),
    content: z.string(),
    size: z.string(),
  })
  .merge(TimestampSchema);

export const NewsCreateSchema = NewsSchema.pick({
  title: true,
  src: true,
  content: true,
  size: true,
});

export const NewsUpdateSchema = NewsSchema.pick({
  title: true,
  src: true,
  content: true,
  size: true,
});

export type NewsType = z.infer<typeof NewsSchema>;
export type NewsCreateType = z.infer<typeof NewsCreateSchema>;
export type NewsUpdateType = z.infer<typeof NewsUpdateSchema>;
