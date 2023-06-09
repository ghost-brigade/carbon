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
    data: { role: "ALL", icon: "profile", order: 1, hidden: false },
  },
  {
    path: "profile/:id",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
    title: "Profil",
    data: { role: "ALL", hidden: true },
  },
  {
    path: "news",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/news/news.component").then((m) => m.NewsComponent),
    title: "News",
    data: { role: "ALL", icon: "news", order: 2, hidden: false },
  },
  {
    path: "search",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/search/search.component").then((m) => m.SearchComponent),
    title: "Recherche",
    data: { role: "ALL", icon: "search", order: 3, hidden: false },
  },
  {
    path: "ressources",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/ressources/ressources.component").then(
        (m) => m.RessourcesComponent
      ),
    title: "Ressources",
    data: { role: "ALL", icon: "document", order: 4, hidden: false },
  },
  {
    path: "leaderboard",
    canActivate: [AuthGuard],
    loadComponent: () =>
      import("./views/leaderboard/leaderboard.component").then(
        (m) => m.LeaderboardComponent
      ),
    title: "Classements",
    data: { role: "ALL", icon: "leaderboard", order: 5, hidden: false },
  },
  {
    path: "login",
    title: "Connexion",
    loadComponent: () =>
      import("./views/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "**",
    redirectTo: "/login",
  },
];
