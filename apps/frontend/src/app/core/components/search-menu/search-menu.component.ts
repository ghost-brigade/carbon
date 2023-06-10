import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchMenuDropdownComponent } from "../search-menu-dropdown/search-menu-dropdown.component";
import { SearchMenuService } from "../../../shared/services/search-menu.service";
import slideUpAnimation from "./animations/slideUp";
import showAnimation from "./animations/show";
import { SearchSortComponent } from "../search-sort/search-sort.component";
import { SearchFilterComponent } from "../search-filter/search-filter.component";

@Component({
  selector: "carbon-search-menu",
  standalone: true,
  imports: [
    CommonModule,
    SearchMenuDropdownComponent,
    SearchSortComponent,
    SearchFilterComponent,
  ],
  templateUrl: "./search-menu.component.html",
  animations: [slideUpAnimation, showAnimation],
})
export class SearchMenuComponent {
  constructor(public searchMenuService: SearchMenuService) {}
}
