import { AuthService } from "../services/auth.service";

import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.$isLoggedIn()) {
      this.router.navigate(["/login"], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    return true;
  }
}
