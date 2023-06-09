export const FrameworkValues = {
  VUEJS: "Vue.js",
  DJANGO: "Django",
  LARAVEL: "Laravel",
  SPRINGBOOT: "Spring Boot",
  EXPRESSJS: "Express.js",
  FLASK: "Flask",
  ANGULAR: "Angular",
  ASPNETCORE: "ASP.NET Core",
  RUBYONRAILS: "Ruby on Rails",
  NEXTJS: "Next.js",
  SYMFONY: "Symfony",
};

export type Framework = (typeof FrameworkValues)[keyof typeof FrameworkValues];
