import { compare, genSalt, hash } from "bcryptjs";
import { UserCreateType, UserType, UserUpdateType } from "@carbon/zod";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUser: UserCreateType): Promise<UserType> {
    try {
      return await this.prisma.user.create({
        data: {
          email: createUser.email,
          password: await this.hashPassword(createUser.password),
          entryDate: new Date(),
          experience: 0,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while creating user");
    }
  }

  async findAll(): Promise<UserType[]> {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching users");
    }
  }

  async findOne(id: string): Promise<UserType> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching user");
    }
  }

  async findUserByEmail(email: string): Promise<UserType> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching user");
    }
  }

  async update(id: string, updateUser: UserUpdateType): Promise<UserType> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUser,
      });
    } catch (error) {
      throw new InternalServerErrorException("Error while updating user");
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });

      return true;
    } catch (error) {
      throw new InternalServerErrorException("Error while deleting user");
    }
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
