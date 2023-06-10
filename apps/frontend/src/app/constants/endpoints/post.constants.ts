import { LoginType, JwtType, UserPreferenceCreateType } from "@carbon/zod";
import { GetUserType } from "../../shared/models/user.model";
export const PostEndpoint = {
  Login: "/login",
  UserPreference: "/user/preference",
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
