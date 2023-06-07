import { Component, signal, computed } from "@angular/core";
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
export class LoginComponent {
  email = signal("");
  password = signal("");
  isValidEmail = computed(() => {
    if (z.string().email().safeParse(this.email()).success === true) {
      return true;
    }
    return false;
  });
}
