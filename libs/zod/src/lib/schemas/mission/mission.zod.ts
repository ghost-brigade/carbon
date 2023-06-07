import { z } from "zod";

export const MissionSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    dateStart: z.date(),
    dateEnd: z.date(),
    rating: z.number(),
    feedback: z.string().optional(),
    societyId: z.string(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const MissionCreateSchema = MissionSchema.pick({
    name: true,
    description: true,
    societyId: true,
    userId: true
});

export const MissionUpdateSchema = MissionSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export type MissionType = z.infer<typeof MissionSchema>;
export type MissionCreateType = z.infer<typeof MissionCreateSchema>;
export type MissionUpdateType = z.infer<typeof MissionUpdateSchema>;
