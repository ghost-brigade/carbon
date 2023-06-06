export const PutEndpoint = {
  Login: "/login",
} as const;

export type PutEndpointMap = {
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

export type PutEndpointValue = (typeof PutEndpoint)[keyof typeof PutEndpoint];

export type EndpointWithParams = {
  [K in PutEndpointValue]: PutEndpointMap[K] extends { params: unknown }
    ? K
    : never;
}[PutEndpointValue];

export type PutResponse<Key extends PutEndpointValue> =
  PutEndpointMap[Key]["response"];
export type PutBody<Key extends PutEndpointValue> = PutEndpointMap[Key]["body"];
export type PutParams<Key extends EndpointWithParams> =
  PutEndpointMap[Key]["params"];
