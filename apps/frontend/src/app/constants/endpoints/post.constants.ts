import {
  LoginType,
  JwtType,
  UserPreferenceCreateType,
  NewsType,
  SocietyType,
  MissionType,
} from "@carbon/zod";
import { GetUserType } from "../../shared/models/user.model";
export const PostEndpoint = {
  Login: "/login",
  UserPreference: "/user/preference",
  TaskList: "/user/tasklist",
  News: "/news",
  Society: "/society",
  Skill: "/skill",
  Mission: "/mission",
} as const;

export type PostEndpointMap = {
  "/login": {
    response: JwtType;
    body: LoginType;
  };
  "/user/preference": {
    response: GetUserType;
    body: UserPreferenceCreateType;
  };
  "/user/tasklist": {
    response: GetUserType;
    body: {
      taskListId: string;
      status: "pending";
    };
  };
  "/news": {
    response: object;
    body: Partial<NewsType>;
  };
  "/society": {
    response: object;
    body: Partial<SocietyType>;
  };
  "/skill": {
    response: object;
    body: {
      name: string;
    };
  };
  "/mission": {
    response: MissionType;
    body: Partial<MissionType>;
  };
};

export type PostEndpointValue =
  (typeof PostEndpoint)[keyof typeof PostEndpoint];

export type PostEndpointWithParams = {
  [K in PostEndpointValue]: PostEndpointMap[K] extends { params: unknown }
    ? K
    : never;
}[PostEndpointValue];

export type PostResponse<Key extends PostEndpointValue> =
  PostEndpointMap[Key]["response"];
export type PostBody<Key extends PostEndpointValue> =
  PostEndpointMap[Key]["body"];
export type PostParams<Key extends PostEndpointWithParams> =
  PostEndpointMap[Key]["params"];
