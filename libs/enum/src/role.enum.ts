export const RolesValues = {
  USER: "user",
  HR: "hr",
  COMMERCIAL: "commercial",
} as const;

export type Roles = (typeof RolesValues)[keyof typeof RolesValues];
