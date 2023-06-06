export const GetEndpoint = {
  Login: "/login",
} as const;

export type GetEndpointMap = {
  "/login": {
    response: {
      success: boolean;
      token: string;
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
