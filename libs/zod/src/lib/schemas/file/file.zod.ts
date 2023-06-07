import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const FileSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    tags: z
      .array(
        z.string().max(30, { message: "Tag must be less than 30 characters" })
      )
      .optional(),
    path: z.string(),
    signedUrl: z.string().optional(),
  })
  .merge(TimestampSchema);

export const FileCreateSchema = FileSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  path: true,
});

export const FileUpdateSchema = FileSchema.omit({
  id: true,
  path: true,
  createdAt: true,
  updatedAt: true,
});

export type FileType = z.infer<typeof FileSchema>;
export type FileCreateType = z.infer<typeof FileCreateSchema>;
export type FileUpdateType = z.infer<typeof FileUpdateSchema>;
