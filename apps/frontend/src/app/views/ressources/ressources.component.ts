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
  ];
  categories = [
    {
      name: "Catégorie 1",
      image: "assets/images/categorie1.png",
    },
    {
      name: "Catégorie 2",
      image: "assets/images/categorie2.png",
    },
    {
      name: "Catégorie 3",
      image: "assets/images/categorie3.png",
    },
  ];
  
  // loaderService: any;
  // requestService: any;
  // // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  // ngOnInit(): void {
  //   this.loaderService.show();
  //   this.requestService
  //     .get({
  //       endpoint: GetEndpoint.Me,
  //     })
  //     .pipe(finalize(() => this.loaderService.hide()))
  //     .subscribe({
  //       next: (res: any) => {
  //         console.log(res);
  //       },
  //     });
  // }
}
