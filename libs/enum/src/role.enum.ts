export const RolesValues = {
  USER: "USER",
  HR: "HR",
  COMMERCIAL: "COMMERCIAL",
} as const;

export type Roles = (typeof RolesValues)[keyof typeof RolesValues];
