export const TaskListStatusValues = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;

export type TaskListStatus =
  (typeof TaskListStatusValues)[keyof typeof TaskListStatusValues];
