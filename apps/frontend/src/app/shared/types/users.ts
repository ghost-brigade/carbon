import { UserType } from "@carbon/zod";

export type User = Pick<UserType, "firstName" | "lastName">;
