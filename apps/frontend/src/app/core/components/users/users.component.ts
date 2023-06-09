import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { User } from "../../../shared/types/users";
import { Observable } from "rxjs";

@Component({
  selector: "carbon-users",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./users.component.html",
})
export class UsersComponent {
  @Input() users: User[] = [];
}
