import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersComponent } from "../../core/components/users/users.component";
import { SearchButtonsComponent } from "../../core/components/search-buttons/search-buttons.component";
import { SearchMenuComponent } from "../../core/components/search-menu/search-menu.component";
import { UserService } from "../../core/services/user.service";
import { SearchMenuService } from "../../shared/services/search-menu.service";
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  skip,
  switchMap,
} from "rxjs/operators";
import { UserParamsType, UserType } from "@carbon/zod";
import { BehaviorSubject, combineLatest } from "rxjs";
import { LoaderService } from "../../core/components/loader/loader.service";

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
  users: UserType[] = [];
  queryParams$ = new BehaviorSubject<UserParamsType>({});

  constructor(
    private userService: UserService,
    public searchMenuService: SearchMenuService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.show();

    const queryParams = this.queryParams$.getValue();

    this.userService
      .getUsers(queryParams)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: console.error,
      });

    this.queryParams$
      .pipe(
        skip(2),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((queryParams) => this.userService.getUsers(queryParams))
      )
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: console.error,
      });

    combineLatest([
      this.searchMenuService.selectedSkills$.pipe(debounceTime(1200)),
      this.searchMenuService.order$,
      this.searchMenuService.search$,
    ]).subscribe({
      next: ([selectedSkills, orderBy, search]) => {
        this.queryParams$.next({
          ...(selectedSkills.length > 0 && {
            skills: selectedSkills.join(","),
          }),
          ...(orderBy && { orderBy }),
          ...(search && { search }),
        });
      },
    });
  }
}
