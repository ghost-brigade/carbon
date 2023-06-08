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

export type NewsType = z.infer<typeof NewsSchema>;
