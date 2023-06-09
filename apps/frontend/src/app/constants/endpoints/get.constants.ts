import { UserType, NewsType } from "@carbon/zod";

export const GetEndpoint = {
  Me: "/user/me",
  Leaderboard: "/leaderboard/:leaderboard",
  News: "/news",
  // Ressources: "/ressources",
} as const;

export type GetEndpointMap = {
  "/user/me": {
    response: UserType;
  };
  "/news": {
    response: NewsType;
  };
  "/leaderboard/:leaderboard": {
    response: UserType[];
    params: {
      leaderboard: "experience" | "seniority" | "mission";
    };
    // "/ressources": {
    //   response: {
    //     RessourceType;
    //   };
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
