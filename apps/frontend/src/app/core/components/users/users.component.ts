import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserType } from "@carbon/zod";
import { RouterModule } from "@angular/router";

@Component({
  selector: "carbon-users",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./users.component.html",
})
export class UsersComponent {
  @Input() users: UserType[] = [];
}
