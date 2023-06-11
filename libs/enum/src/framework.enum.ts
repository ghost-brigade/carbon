export const FrameworkValues = {
  ANGULAR: "Angular",
  VUEJS: "Vue.js",
  SYMFONY: "Symfony",

  LARAVEL: "Laravel",
  NODEJS: "Node.js",
  ASPNETCORE: "ASP.NET Core",
  NEXTJS: "Next.js",
};

export type Framework = (typeof FrameworkValues)[keyof typeof FrameworkValues];
