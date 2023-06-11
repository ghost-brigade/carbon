import {
  SchoolType,
  SkillType,
  SocietyType,
  UserType,
  NewsType,
  MissionType,
  EventType,
} from "@carbon/zod";
import { GetUserType } from "../../shared/models/user.model";

export const GetEndpoint = {
  Me: "/user/me",
  Leaderboard: "/leaderboard/:leaderboard",
  News: "/news",
  Logout: "/logout",
  Skill: "/skill",
  Society: "/society",
  User: "/user",
  School: "/school",
  UserProfile: "/user/:id",
  SearchUserPreference: "/user-preference/search",
  Event: "/event",
  SkillById: "/skill/:id",
  Mission: "/mission",
} as const;

export type GetEndpointMap = {
  "/user/me": {
    response: GetUserType;
  };
  "/news": {
    response: NewsType[];
  };
  "/event": {
    response: EventType[];
    queryParams: {
      type?: string;
    };
  };
  "/leaderboard/:leaderboard": {
    response: GetUserType[];
    params: {
      leaderboard: "experience" | "seniority" | "mission";
    };
  };
  "/logout": {
    response: undefined;
  };
  "/skill": {
    response: SkillType[];
  };
  "/society": {
    response: SocietyType[];
  };
  "/user": {
    response: UserType[];
    queryParams: {
      skills?: string;
      orderBy?: string;
      search?: string;
    };
  };
  "/school": {
    response: SchoolType[];
  };

  "/user/:id": {
    response: GetUserType;
    params: {
      id: string;
    };
  };
  "/user-preference/search": {
    response: string[];
    queryParams: {
      description: string;
    };
  };
  "/skill/:id": {
    response: {
      name: string;
      taskLists: {
        id: string;
        name: string;
        level: number;
        description: string;
        skillId: string;
        required: boolean;
        createdAt: string;
        updatedAt: string;
      }[];
    };
    params: {
      id: string;
    };
  };
  "/mission": {
    response: MissionType[];
  };
};

export type GetEndpointValue = (typeof GetEndpoint)[keyof typeof GetEndpoint];

export type EndpointWithParams = {
  [K in GetEndpointValue]: GetEndpointMap[K] extends { params: unknown }
    ? K
    : never;
}[GetEndpointValue];

export type EndpointWithQueryParams = {
  [K in GetEndpointValue]: GetEndpointMap[K] extends { queryParams: unknown }
    ? K
    : never;
}[GetEndpointValue];

export type GetResponse<Key extends GetEndpointValue> =
  GetEndpointMap[Key]["response"];
export type GetParams<Key extends EndpointWithParams> =
  GetEndpointMap[Key]["params"];
