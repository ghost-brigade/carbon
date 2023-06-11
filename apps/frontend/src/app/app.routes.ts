import { Route } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";

export const appRoutes: Route[] = [
  {
    path: "profile/me",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
    title: "Profil",
    data: { roles: ["user"], icon: "profile", order: 1, hidden: false },
  },
  {
    path: "profile/:id",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
    title: "Profil",
    data: { roles: ["user", "hr"], hidden: true },
  },
  {
    path: "news",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/news/news.component").then((m) => m.NewsComponent),
    title: "News",
    data: {
      roles: ["user", "hr"],
      icon: "news",
      order: 2,
      hidden: false,
      hasAdmin: true,
    },
  },
  {
    path: "search",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/search/search.component").then((m) => m.SearchComponent),
    title: "Recherche",
    data: { roles: ["user", "hr"], icon: "search", order: 3, hidden: false },
  },
  {
    path: "ressources",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/ressources/ressources.component").then(
        (m) => m.RessourcesComponent
      ),
    title: "Ressources",
    data: {
      roles: ["user", "hr"],
      icon: "document",
      order: 4,
      hidden: false,
      hasAdmin: true,
    },
  },
  {
    path: "leaderboard",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/leaderboard/leaderboard.component").then(
        (m) => m.LeaderboardComponent
      ),
    title: "Classements",
    data: { roles: ["user"], icon: "leaderboard", order: 5, hidden: false },
  },
  {
    path: "login",
    title: "Connexion",
    loadComponent: () =>
      import("./views/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "news/admin",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/news-admin/news-admin.component").then(
        (m) => m.NewsAdminComponent
      ),
    title: "Admin News",
    data: { roles: ["hr"], hasAdmin: true },
  },
  {
    path: "skills/admin",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/skills-admin/skills-admin.component").then(
        (m) => m.SkillsAdminComponent
      ),
    title: "Admin Skills",
    data: { roles: ["hr"], icon: "leaderboard", order: 5, hidden: false },
  },
  {
    path: "missions/admin",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/missions-admin/missions-admin.component").then(
        (m) => m.MissionsAdminComponent
      ),
    title: "Admin Missions",
    data: { roles: ["hr"], icon: "money", order: 5, hidden: false },
  },
  {
    path: "schools/admin",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/schools-admin/schools-admin.component").then(
        (m) => m.SchoolsAdminComponent
      ),
    title: "Admin Schools",
    data: { roles: ["hr"], icon: "school", order: 5, hidden: false },
  },
  {
    path: "ressources/admin",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/ressources-admin/ressources-admin.component").then(
        (m) => m.RessourcesAdminComponent
      ),
    title: "Admin Ressources",
    data: { roles: ["hr"], hasAdmin: true },
  },
  {
    path: "profile/me/tasks",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/tasklist/tasklist.component").then(
        (m) => m.TasklistComponent
      ),
    title: "Tasklist",
    data: { roles: ["user"] },
  },
  {
    path: "**",
    redirectTo: "/login",
  },
];
