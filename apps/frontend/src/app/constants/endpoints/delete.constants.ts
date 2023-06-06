export const DeleteEndpoint = {
  Login: "/login",
} as const;

export type DeleteEndpointMap = {
  "/login": {
    response: {
      success: boolean;
      token: string;
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
