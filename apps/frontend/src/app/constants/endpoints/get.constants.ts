import {
  SchoolType,
  SkillType,
  SocietyType,
  UserType,
  NewsType,
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
} as const;

export type GetEndpointMap = {
  "/user/me": {
    response: GetUserType;
  };
  "/news": {
    response: NewsType;
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
