import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "../../core/components/users/users.component";
import { User } from "../../shared/types/users";
import { SearchButtonsComponent } from "../../core/components/search-buttons/search-buttons.component";
import { SearchMenuComponent } from "../../core/components/search-menu/search-menu.component";
import { UserService } from "../../core/services/user.service";
import { SearchMenuService } from "../../shared/services/search-menu.service";
import {
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  skip,
  switchMap,
} from "rxjs/operators";
import { UserParamsType } from "@carbon/zod";
import { BehaviorSubject } from "rxjs";

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
  queryParams$ = new BehaviorSubject<UserParamsType>({
    skills: "",
    orderBy: "lastName:asc",
  });

  constructor(
    private userService: UserService,
    private searchMenuService: SearchMenuService
  ) {}

  ngOnInit() {
    const queryParams = this.queryParams$.getValue();

    this.userService.getUsers(queryParams).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: console.error,
    });

    this.queryParams$
      .pipe(
        skip(2),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((queryParams) => this.userService.getUsers(queryParams))
      )
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: console.error,
      });

    this.searchMenuService.selectedSkills$
      .pipe(combineLatestWith(this.searchMenuService.order$))
      .subscribe({
        next: ([selectedSkills, orderBy]) => {
          this.queryParams$.next({
            skills: selectedSkills.join(","),
            orderBy,
          });
        },
      });
  }
}
