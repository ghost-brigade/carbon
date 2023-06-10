import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "carbon-search-menu-dropdown",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./search-menu-dropdown.component.html",
})
export class SearchMenuDropdownComponent {
  @Input() elements: { id: string; name: string }[] = [];
  @Input() selectedElements = new BehaviorSubject<string[]>([]);
  @Input() isOpen = false;

  @Output() elementChange = new EventEmitter<string>();

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleElement = (name: string) => {
    this.elementChange.emit(name);
  };
}
