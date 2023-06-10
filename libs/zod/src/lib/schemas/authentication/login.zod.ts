import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const JwtSchema = z.object({
  access_token: z.string(),
});

export const LoginResponseSchema = z.object({
  access_token: z.string(),
});

export const JwtResponseSchema = z.object({
  email: z.string().email(),
  token: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type LoginType = z.infer<typeof LoginSchema>;
export type JwtType = z.infer<typeof JwtSchema>;
export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
export type JwtResponseType = z.infer<typeof JwtResponseSchema>;
