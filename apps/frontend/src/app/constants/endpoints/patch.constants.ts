import { NewsType, SocietyType } from "@carbon/zod";

export const PatchEndpoint = {
  News: "/news/:id",
  Society: "/society/:id",
  Skill: "/skill/:id",
} as const;

export type PatchEndpointMap = {
  "/news/:id": {
    response: object;
    body: Partial<NewsType>;
    params: {
      id: string;
    };
  };
  "/society/:id": {
    response: object;
    body: Partial<SocietyType>;
    params: {
      id: string;
    };
  };
  "/skill/:id": {
    response: object;
    body: {
      name: string;
    };
    params: {
      id: string;
    };
  };
};

export type PatchEndpointValue =
  (typeof PatchEndpoint)[keyof typeof PatchEndpoint];

export type EndpointWithParams = {
  [K in PatchEndpointValue]: PatchEndpointMap[K] extends { params: unknown }
    ? K
    : never;
}[PatchEndpointValue];

export type PatchResponse<Key extends PatchEndpointValue> =
  PatchEndpointMap[Key]["response"];
export type PatchBody<Key extends PatchEndpointValue> =
  PatchEndpointMap[Key]["body"];
export type PatchParams<Key extends EndpointWithParams> =
  PatchEndpointMap[Key]["params"];
