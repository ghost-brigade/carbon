import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchMenuService } from "../../../shared/services/search-menu.service";

@Component({
  selector: "carbon-search-buttons",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./search-buttons.component.html",
})
export class SearchButtonsComponent {
  constructor(public searchMenuService: SearchMenuService) {}
}
