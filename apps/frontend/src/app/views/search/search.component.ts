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
} from "rxjs/operators";
import { UserParamsType, UserType } from "@carbon/zod";
import { LoaderService } from "../../core/components/loader/loader.service";

type QueryParams = Pick<UserParamsType, "skills" | "orderBy" | "search">;

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

  constructor(
    private userService: UserService,
    public searchMenuService: SearchMenuService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.search();

    this.searchMenuService.search$
      .pipe(skip(1), debounceTime(300), distinctUntilChanged())
      .subscribe({
        next: () => this.search(),
        error: console.error,
      });
  }

  search() {
    this.loaderService.show();

    const selectedSkills = this.searchMenuService.selectedSkills$.value;
    const orderBy = this.searchMenuService.order$.value;
    const search = this.searchMenuService.search$.value;

    const queryParams: QueryParams = {
      ...(selectedSkills.length > 0 && { skills: selectedSkills.join(",") }),
      ...(orderBy && { orderBy }),
      ...(search && { search }),
    };

    this.userService
      .getUsers(queryParams)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (users) => {
          this.users = users;
        },
      });
  }
}
