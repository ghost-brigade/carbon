import { MissionType } from "@carbon/zod";

export const DeleteEndpoint = {
  UserPreference: "/user/preference/:id",
  News: "/news/:id",
  Society: "/society/:id",
  Skill: "/skill/:id",
  Mission: "/mission/:id",
} as const;

export type DeleteEndpointMap = {
  "/user/preference/:id": {
    response: object;
    params: {
      id: string;
    };
  };
  "/news/:id": {
    response: object;
    params: {
      id: string;
    };
  };
  "/society/:id": {
    response: object;
    params: {
      id: string;
    };
  };
  "/skill/:id": {
    response: object;
    params: {
      id: string;
    };
  };
  "/mission/:id": {
    response: MissionType;
    params: {
      id: string;
    };
  };
};

export type DeleteEndpointValue =
  (typeof DeleteEndpoint)[keyof typeof DeleteEndpoint];

export type DeleteEndpointWithParams = {
  [K in DeleteEndpointValue]: DeleteEndpointMap[K] extends { params: unknown }
    ? K
    : never;
}[DeleteEndpointValue];

export type DeleteResponse<Key extends DeleteEndpointValue> =
  DeleteEndpointMap[Key]["response"];
export type DeleteParams<Key extends DeleteEndpointWithParams> =
  DeleteEndpointMap[Key]["params"];
