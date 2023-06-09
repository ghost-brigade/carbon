import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";
import { FileValues } from "@carbon/enum";

export const FileSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    type: z.nativeEnum(FileValues).default(FileValues.Resource),
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

export const FileParamsType = FileSchema.pick({
  tags: true,
  type: true,
});

export type FileType = z.infer<typeof FileSchema>;
export type FileCreateType = z.infer<typeof FileCreateSchema>;
export type FileUpdateType = z.infer<typeof FileUpdateSchema>;
export type FileParamsType = z.infer<typeof FileParamsType>;
