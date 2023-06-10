import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SearchMenuService } from "../../../shared/services/search-menu.service";

@Component({
  selector: "carbon-search-sort",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./search-sort.component.html",
})
export class SearchSortComponent {
  constructor(public searchMenuService: SearchMenuService) {}
}
