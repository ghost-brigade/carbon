import { Component, signal, computed, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { z } from "zod";
import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { RequestService } from "../../shared/services/request.service";
import { PostEndpoint } from "../../constants/endpoints/post.constants";
import { finalize } from "rxjs";
import { LoaderService } from "../../core/components/loader/loader.service";
import { AuthService } from "../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "carbon-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  animations: [
    trigger("enter", [
      transition(":enter", [
        animate(
          "300ms ease-in-out",
          keyframes([
            style({ transform: "scale(0)", opacity: 0 }),
            style({ transform: "scale(1.1)", opacity: 0.5 }),
            style({ transform: "scale(1)", opacity: 1 }),
          ])
        ),
      ]),
      transition(":leave", [
        animate(
          "300ms ease-in-out",
          keyframes([
            style({ transform: "scale(1)", opacity: 1 }),
            style({ transform: "scale(1.1)", opacity: 0.5 }),
            style({ transform: "scale(0)", opacity: 0 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  requestService = inject(RequestService);
  loaderService = inject(LoaderService);
  authService = inject(AuthService);
  router = inject(Router);
  email = signal("");
  password = signal("");
  isValidEmail = computed(() => {
    if (z.string().email().safeParse(this.email()).success === true) {
      return true;
    }
    return false;
  });

  ngOnInit() {
    if (this.authService.isTokenValid()) {
      this.router.navigate(["/profile/me"]);
    }
  }

  submitLogin() {
    this.loaderService.show();
    this.requestService
      .post({
        endpoint: PostEndpoint.Login,
        body: {
          email: this.email(),
          password: this.password(),
        },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          this.authService.setToken(res.access_token);

          if (this.authService.isTokenValid()) {
            this.router.navigate(["/profile/me"]);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
