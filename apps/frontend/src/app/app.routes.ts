import { Route } from "@angular/router";

export const appRoutes: Route[] = [
  {
    path: "profile/me",
    loadComponent: () =>
      import("./views/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
    title: "Profil",
    data: { role: "ALL", icon: "person", order: 1, hidden: false },
  },
  {
    path: "profile/:id",
    loadComponent: () =>
      import("./views/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
    title: "Profil",
    data: { role: "ALL", hidden: true },
  },
  {
    path: "news",
    loadComponent: () =>
      import("./views/news/news.component").then((m) => m.NewsComponent),
    title: "News",
    data: { role: "ALL", icon: "article", order: 2, hidden: false },
  },
  {
    path: "search",
    loadComponent: () =>
      import("./views/search/search.component").then((m) => m.SearchComponent),
    title: "Recherche",
    data: { role: "ALL", icon: "search", order: 3, hidden: false },
  },
  {
    path: "ressources",
    loadComponent: () =>
      import("./views/ressources/ressources.component").then(
        (m) => m.RessourcesComponent
      ),
    title: "Ressources",
    data: { role: "ALL", icon: "folder", order: 4, hidden: false },
  },
  {
    path: "leaderboard",
    loadComponent: () =>
      import("./views/leaderboard/leaderboard.component").then(
        (m) => m.LeaderboardComponent
      ),
    title: "Classements",
    data: { role: "ALL", icon: "leaderboard", order: 5, hidden: false },
  },
  {
    path: "login",
    loadComponent: () =>
      import("./views/login/login.component").then((m) => m.LoginComponent),
  },
  {
    path: "**",
    redirectTo: "/login",
  },
];
