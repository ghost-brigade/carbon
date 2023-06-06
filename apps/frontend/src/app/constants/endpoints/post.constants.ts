export const PostEndpoint = {
    Login: "/login",
} as const;

export type PostEndpointMap = {
    "/login": {
        response: {
            success: boolean;
            token: string;
        };
        body: object;
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
