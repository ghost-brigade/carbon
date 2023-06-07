import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const UserTokenSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    token: z.string(),
    status: z.boolean(),
  })
  .merge(TimestampSchema);

export const UserTokenCreateSchema = UserTokenSchema.pick({
  userId: true,
  token: true,
  status: true,
});

export const UserTokenUpdateSchema = UserTokenSchema.pick({
  status: true,
});

export type UserTokenType = z.infer<typeof UserTokenSchema>;
export type UserTokenCreateType = z.infer<typeof UserTokenCreateSchema>;
export type UserTokenUpdateType = z.infer<typeof UserTokenUpdateSchema>;
