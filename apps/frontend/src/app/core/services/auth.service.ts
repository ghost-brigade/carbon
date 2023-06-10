import { Injectable, inject, signal } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  router = inject(Router);
  $isLoggedIn = signal(false);
  $role = signal("");
  $userPicture = signal("");
  $token = signal("");

  constructor() {
    if (localStorage.getItem("carbon_token")) {
      this.$token.set(localStorage.getItem("carbon_token") || "");
      if (!this.isTokenValid()) {
        this.router.navigate(["/login"]);
      }
    }
  }

  setToken(token: string) {
    this.$token.set(token);
    localStorage.setItem("carbon_token", this.$token());
  }

  isTokenValid() {
    if (this.$token()) {
      const { exp, role } = JSON.parse(atob(this.$token().split(".")[1]));
      if (!exp) {
        return false;
      } else if (Math.floor(new Date().getTime() / 1000) < exp) {
        this.$isLoggedIn.set(true);
        this.$role.set(role);
        return true;
      }
    }
    return false;
  }

  logout() {
    this.$token.set("");
    this.$isLoggedIn.set(false);
    localStorage.removeItem("carbon_token");
  }
}
