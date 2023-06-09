import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const UserPreferenceSchema = z
  .object({
    id: z.string().uuid(),
    userId: z.string(),
    description: z.string(),
    isLiked: z.boolean(),
  })
  .merge(TimestampSchema);

export type UserPreferenceType = z.infer<typeof UserPreferenceSchema>;
