import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "../../core/components/users/users.component";
import { User } from "../../shared/types/users";
import { SearchButtonsComponent } from "../../core/components/search-buttons/search-buttons.component";
import { SearchMenuComponent } from "../../core/components/search-menu/search-menu.component";
import { UserService } from "../../core/services/user.service";
import { SearchMenuService } from "../../shared/services/search-menu.service";
import {
  debounceTime,
  distinctUntilChanged,
  skip,
  switchMap,
} from "rxjs/operators";

export interface QueryParams {
  search?: string;
}

@Component({
  selector: "carbon-search",
  standalone: true,
  imports: [
    CommonModule,
    SearchButtonsComponent,
    SearchMenuComponent,
    UsersComponent,
  ],
  templateUrl: "./search.component.html",
})
export class SearchComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private searchMenuService: SearchMenuService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: console.error,
    });

    this.searchMenuService.selectedSkills$
      .pipe(
        skip(1),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((skills) => this.userService.getUsersBySkills(skills))
      )
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: console.error,
      });
  }
}
