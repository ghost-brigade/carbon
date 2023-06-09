import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "carbon-search-sort",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./search-sort.component.html",
})
export class SearchSortComponent {
  sort = {
    name: "asc",
  };
}
