import { Roles } from "@carbon/enum";
import { UserType } from "@carbon/zod";

/**
 * Check if user got appropriate rights based on his role
 * @param user
 * @param roles
 * @returns
 */
export default function hasRight(user: UserType, roles: Roles[]): boolean {
  return roles.some((role) => user.role === role);
}
