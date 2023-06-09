import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const MissionSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    dateStart: z.string().or(z.date()),
    dateEnd: z.string().or(z.date()).optional(),
    rating: z.number().optional(),
    feedback: z.string().optional(),
    averageDailyRate: z.string().or(
      z.array(
        z.object({
          amount: z.number(),
          date: z.string().or(z.date()),
        })
      )
    ),
    societyId: z.string().optional(),
    userId: z.string().optional(),
  })
  .merge(TimestampSchema);

export const MissionParamsSchema = MissionSchema.pick({
  name: true,
});

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
export type MissionParamsType = z.infer<typeof MissionParamsSchema>;
