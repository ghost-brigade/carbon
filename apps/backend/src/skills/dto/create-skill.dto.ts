import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateSkillDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  language: string;
}
