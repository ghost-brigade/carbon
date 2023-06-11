import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const EventSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    type: z.string(),
    date: z.string(),
    src: z.string(),
    content: z.string(),
    tag: z.string(),
  })
  .merge(TimestampSchema);

export type EventType = z.infer<typeof EventSchema>;
export const EventParamsSchema = EventSchema.pick({ type: true });
export type EventParamsType = z.infer<typeof EventParamsSchema>;
