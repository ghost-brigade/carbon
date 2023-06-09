import { SkillType } from "@carbon/zod";

export type Skill = Pick<SkillType, "id" | "name">;
