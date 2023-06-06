import { Component, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LOADER_ANIMATION } from "./loader.animation";
import { LoaderService } from "./loader.service";

@Component({
  selector: "carbon-loader",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"],
  animations: LOADER_ANIMATION,
})
export class LoaderComponent {
  $visible = computed(() => this.loaderService.$showLoader());
  constructor(private loaderService: LoaderService) {}
}
