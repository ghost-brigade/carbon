import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { finalize } from "rxjs";

@Component({
  selector: "carbon-ressources",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ressources.component.html",
  styleUrls: ["./ressources.component.css"],
})
export class RessourcesComponent {}
