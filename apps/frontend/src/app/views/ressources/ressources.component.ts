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
export class RessourcesComponent {
  list = [
    {
      name: "Ressource 1",
      description: "Description 1",
      link: "https://www.google.com",
    },
    {
      name: "Ressource 2",
      description: "Description 2",
      link: "https://www.google.com",
    },
    {
      name: "Ressource 3",
      description: "Description 3",
      link: "https://www.google.com",
    },
    {
      name: "Ressource 4",
      description: "Description 4",
      link: "https://www.google.com",
    },
];
}
