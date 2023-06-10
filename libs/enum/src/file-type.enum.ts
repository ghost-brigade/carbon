export const FileValues = {
  Avatar: "avatar",
  Resource: "resource",
} as const;

export type FileType = (typeof FileValues)[keyof typeof FileValues];
