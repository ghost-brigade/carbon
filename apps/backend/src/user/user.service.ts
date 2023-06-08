import { compare, genSalt, hash } from "bcryptjs";
import {
  UserCreateType,
  UserPreferenceCreateType,
  UserSkillCreateType,
  UserType,
  UserUpdateType,
} from "@carbon/zod";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUser: UserCreateType): Promise<UserType> {
    try {
      return (await this.prisma.user.create({
        data: {
          email: createUser.email,
          firstName: createUser.firstName,
          lastName: createUser.lastName,
          birthDate: createUser.birthDate,
          password: await this.hashPassword(createUser.password),
        },
      })) as UserType;
    } catch (error) {
      throw new InternalServerErrorException("Error while creating user");
    }
  }

  async findAll({
    limit,
    order,
    include,
  }: {
    limit?: number;
    order?: {
      [key: string]: "asc" | "desc";
    };
    include?: {
      [key: string]: boolean | object;
    };
  }): Promise<UserType[]> {
    try {
      const request = {
        where: {},
        orderBy: {
          ...order,
        },
        take: limit,
      };

      if (include) {
        request["include"] = include;
      }

      return (await this.prisma.user.findMany(request)) as UserType[];
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching users");
    }
  }

  // async leaderboardPercentage(): Promise<number> {
  //   try {
  //     // calcul if i'm in the top 1% of the leaderboard

  //   } catch (error) {
  //     throw new InternalServerErrorException("Error while fetching users");
  //   }
  // }

  async findOne(id: string): Promise<UserType> {
    try {
      return (await this.prisma.user.findUnique({
        where: { id },
        include: {
          skills: {
            include: {
              skill: {
                select: {
                  name: true,
                },
              },
            },
          },
          avatar: true,
          taskLists: true,
          UserPreference: true,
          School: true,
          UserAchievement: true,
        },
      })) as UserType;
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching user");
    }
  }

  async findUserByEmail(email: string): Promise<UserType> {
    try {
      return (await this.prisma.user.findUnique({
        where: { email },
        include: {
          skills: {
            include: {
              skill: {
                select: {
                  name: true,
                },
              },
            },
          },
          avatar: true,
          taskLists: true,
          missions: true,
          UserPreference: true,
          School: true,
          UserAchievement: true,
        },
      })) as UserType;
    } catch (error) {
      throw new InternalServerErrorException("Error while fetching user");
    }
  }

  async update(id: string, updateUser: UserUpdateType): Promise<UserType> {
    try {
      if (updateUser.password) {
        updateUser.password = await this.hashPassword(updateUser.password);
      }

      return (await this.prisma.user.update({
        where: { id },
        data: updateUser,
      })) as UserType;
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

  async addSkillToUser(
    id: string,
    createSkill: UserSkillCreateType
  ): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { skills: true },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { skillId, level } = createSkill;

    const existingSkill = user.skills.find(
      (skill) => skill.skillId === skillId
    );

    if (existingSkill) {
      throw new UnprocessableEntityException(
        "Skill already exists for the user"
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        skills: {
          create: { skillId, level },
        },
      },
      include: { skills: true }, // Include the updated skills in the response
    });

    return updatedUser;
  }

  async addPreferenceToUser(
    id: string,
    createPreference: UserPreferenceCreateType
  ): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { UserPreference: true },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { description, isLiked } = createPreference;

    const existingPreferences = user.UserPreference.filter(
      (preference) => preference.isLiked === isLiked
    );

    if (existingPreferences.length >= 5) {
      const preferenceType = isLiked ? "true" : "false";
      throw new UnprocessableEntityException(
        `User already has 5 preferences with isLiked ${preferenceType}`
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        UserPreference: {
          create: {
            description: description,
            isLiked: isLiked,
          },
        },
      },
      include: { UserPreference: true },
    });

    return updatedUser;
  }
}
