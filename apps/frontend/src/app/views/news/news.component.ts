import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { finalize } from "rxjs";
import { RequestService } from "../../shared/services/request.service";
import { LoaderService } from "../../core/components/loader/loader.service";

@Component({
  selector: "carbon-news",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  requestService = inject(RequestService);
  loaderService = inject(LoaderService);
  news = [
    {
      title: "🎤 Nouvelle conference",

      tag: "Carbon",
      src: "1.jpg",
      content: "Conference JS le 03/24",
      size: "lg:col-span-2",
      color: "bg-base-100",
    },
    {
      title: "🎓 Certification",
      tag: "Carbon",
      src: "8.jpeg",
      content: "Nouvelle certification",
      size: "lg:col-span-1",
      color: "bg-base-100",
    },
    {
      title: "🎤 Conférence",
      tag: "Carbon",
      src: "3.jpg",
      content: "Nouvelle conférence Frontend",
      size: "lg:col-span-1",
      color: "bg-error",
    },
    {
      title: "🥇 Compétition",
      tag: "Carbon",
      src: "4.jpg",
      content: "Hackathon",
      size: "lg:col-span-1",
      color: "bg-primary",
    },
    {
      title: "🥇 Leaderboard",
      tag: "Carbon",
      src: "2.jpg",
      content: "Alexis Lours, toujours au top",
      size: "col-span-1",
      color: "bg-error",
    },
    {
      title: "📖 Cours",
      tag: "Formation",
      src: "6.jpg",
      content: "Apprenez NestJS",
      size: "lg:col-span-2",
      color: "bg-primary",
    },
    {
      title: "🤝 Rdv",
      tag: "RH",
      src: "7.jpg",
      content: "RDV RH le 12/11",
      size: "lg:col-span-2",
      color: "bg-base-100",
    },
    {
      title: "🥳 Soirée",
      tag: "Carbon",
      src: "9.jpeg",
      content: "Soirée gala Carbon",
      size: "lg:col-span-1",
      color: "bg-primary",
    },
    {
      title: "Bonnes pratiques",
      tag: "Carbon",
      src: "5.jpg",
      content: "Nos conseils",
      size: "lg:col-span-1",
      color: "bg-error",
    },
    {
      title: "🌿 Conseils",
      tag: "Lifestyle",
      src: "10.jpeg",
      content: "Comment bien dormir ?",
      size: "lg:col-span-2",
      color: "bg-error",
    },
    {
      title: "🚨 Sécurité",
      tag: "Carbon",
      src: "11.jpeg",
      content: "Log4j, le fléau",
      size: "lg:col-span-2",
      color: "bg-base-100",
    },
  ];
  ngOnInit(): void {
    this.loaderService.show();
    this.requestService
      .get({
        endpoint: GetEndpoint.Me,
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
  }
}
