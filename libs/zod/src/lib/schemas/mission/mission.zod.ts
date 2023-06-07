import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const MissionSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    societyId: z.string().uuid().optional(),
    userId: z.string().uuid().optional(),
    description: z.string().optional(),
    dateStart: z.string(),
    dateEnd: z.string(),
    rating: z.number().optional(),
    feedback: z.string().optional(),
  })
  .merge(TimestampSchema);

export const MissionCreateSchema = MissionSchema.pick({
  name: true,
  description: true,
  dateStart: true,
  dateEnd: true,
  societyId: true,
  userId: true,
});

export const MissionUpdateSchema = MissionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type MissionType = z.infer<typeof MissionSchema>;
export type MissionCreateType = z.infer<typeof MissionCreateSchema>;
export type MissionUpdateType = z.infer<typeof MissionUpdateSchema>;
