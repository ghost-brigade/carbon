export const PatchEndpoint = {
  Login: "/login",
} as const;

export type PatchEndpointMap = {
  "/login": {
    response: {
      success: boolean;
      token: string;
    };
    body: {
      username: string;
      password: string;
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
