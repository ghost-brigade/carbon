import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "carbon-ressources",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./ressources.component.html",
  styleUrls: ["./ressources.component.css"],
})
export class RessourcesComponent {
  ressources = [
    {
      name: "Ressource 1",
      description: "Description de la ressource 1",
      image: "assets/images/ressource1.png",
    },
    {
      name: "Ressource 2",
      description: "Description de la ressource 2",
      image: "assets/images/ressource2.png",
    },
    {
      name: "Ressource 3",
      description: "Description de la ressource 3",
      image: "assets/images/ressource3.png",
    },
    
  ]
}
