import { compare, genSalt, hash } from "bcryptjs";
import { UserCreateType, UserType, UserUpdateType } from "@carbon/zod";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  async create(createUser: UserCreateType): Promise<UserType> {
    return {};
  }

  async findAll(): Promise<UserType[]> {
    return [{}];
  }

  async findOne(id: string): Promise<UserType> {
    return {};
  }

  async findUserByEmail(email: string): Promise<UserType> {
    return {};
  }

  async update(id: string, updateUser: UserUpdateType): Promise<UserType> {
    return {};
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }

  async comparePassword({
    password,
    plainPassword,
  }: {
    password: string;
    plainPassword: string;
  }): Promise<boolean> {
    return await compare(plainPassword, password);
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, await genSalt(10));
  }
}
