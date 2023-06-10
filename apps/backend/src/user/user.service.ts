import { Prisma, School, User } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";
import {
  UserCreateType,
  UserParamsType,
  UserPreferenceCreateType,
  UserSkillCreateType,
  UserTaskListCreateType,
  UserType,
  UserUpdateType,
} from "@carbon/zod";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Roles, RolesValues } from "@carbon/enum";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  hasRight(user: UserType, roles: Roles[]): boolean {
    return roles.some((role) => user.role === role);
  }

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
    params,
    limit,
    order,
    include,
  }: {
    params?: UserParamsType;
    limit?: number;
    order?: {
      [key: string]: "asc" | "desc";
    };
    include?: {
      [key: string]: boolean | object;
    };
  }): Promise<UserType[]> {
    try {
      const query = {
        where: {},
        orderBy: {
          ...order,
        },
        take: limit,
      };

      if (include) {
        query["include"] = include;
      }

      if (params?.search) {
        const { search } = params;
        const names = search.split(/\s+/);
        const [firstName, lastName] = names;

        query.where["OR"] = [
          {
            firstName: {
              startsWith: firstName,
              mode: "insensitive",
            },
            lastName: {
              startsWith: lastName,
              mode: "insensitive",
            },
          },
          {
            firstName: {
              startsWith: lastName,
              mode: "insensitive",
            },
            lastName: {
              startsWith: firstName,
              mode: "insensitive",
            },
          },
        ];
      }

      if (params?.firstName) {
        query.where["firstName"] = {
          startsWith: params.firstName,
          mode: "insensitive",
        };
      }
      if (params?.lastName) {
        query.where["lastName"] = {
          startsWith: params.lastName,
          mode: "insensitive",
        };
      }
      if (params?.skills) {
        query.where["skills"] = {
          some: {
            skill: {
              name: { in: params.skills.split(",") },
            },
          },
        };
      }

      return (await this.prisma.user.findMany(query)) as UserType[];
    } catch (error) {
      console.error(error);
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

  async update(
    id: string,
    updateUser: UserUpdateType,
    user: UserType
  ): Promise<UserType> {
    if (typeof updateUser.salary !== "number") {
      throw new UnprocessableEntityException("Salary must be a number");
    }

    if (
      this.hasRight(user, [RolesValues.HR, RolesValues.COMMERCIAL]) === false
    ) {
      if (id !== user.id) {
        throw new UnauthorizedException(
          "You don't have the right to update this user"
        );
      }

      if (updateUser.salary) {
        throw new UnauthorizedException("You can't update your salary");
      }

      if (updateUser.experience) {
        throw new UnauthorizedException("You can't update your experience");
      }
    }

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

  async removePreferenceFromUser(
    id: string,
    preferenceId: string
  ): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { UserPreference: true },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const existingPreference = user.UserPreference.find(
      (preference) => preference.id === preferenceId
    );

    if (!existingPreference) {
      throw new NotFoundException("Preference not found");
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        UserPreference: {
          delete: {
            id: preferenceId,
          },
        },
      },
      include: { UserPreference: true },
    });

    return updatedUser;
  }

  async addTaskListToUser(
    id: string,
    createTaskList: UserTaskListCreateType
  ): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { taskLists: true },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const { taskListId, status } = createTaskList;

    const existingTaskList = user.taskLists.find(
      (tasklist) => tasklist.taskListId === taskListId
    );

    if (existingTaskList) {
      throw new UnprocessableEntityException(
        "Tasklist already exists for the user"
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        taskLists: {
          create: { taskListId, status },
        },
      },
      include: { taskLists: true },
    });

    return updatedUser;
  }
}
