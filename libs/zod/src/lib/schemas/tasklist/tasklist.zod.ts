import { z } from "zod";
import { TimestampSchema } from "../timestamp.zod";

export const TaskListSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    level: z.number(),
    description: z.string(),
    skillId: z.string(),
    required: z.boolean(),
    /** TODO here */
    userTaskLists: z.any(),
    /** TODO here */
  })
  .merge(TimestampSchema);

export const TaskListCreateSchema = TaskListSchema.pick({
  name: true,
  level: true,
  description: true,
  skillId: true,
  required: true,
});

export const TaskListUpdateSchema = TaskListSchema.pick({
  name: true,
  level: true,
  description: true,
  skillId: true,
  required: true,
});

export type TaskListType = z.infer<typeof TaskListSchema>;
export type TaskListCreateType = z.infer<typeof TaskListCreateSchema>;
export type TaskListUpdateType = z.infer<typeof TaskListUpdateSchema>;
