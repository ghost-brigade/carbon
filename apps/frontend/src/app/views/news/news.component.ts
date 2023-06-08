import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "carbon-news",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent {
  news = [
    {
      title: "Nouvelle conference",
      tag: "Carbon",
      src: "1.jpg",
      content: "Conference JS le 03/24",
      size: "lg:col-span-2",
      color: "bg-base-100",
    },
    {
      title: "Certification",
      tag: "Carbon",
      src: "2.jpg",
      content: "Nouvelle certification",
      size: "lg:col-span-1",
      color: "bg-base-100",
    },
    {
      title: "Conférence",
      tag: "Carbon",
      src: "3.jpg",
      content: "Nouvelle conférence Frontend disponible",
      size: "lg:col-span-1",
      color: "bg-error",
    },
    {
      title: "Compétition",
      tag: "Carbon",
      src: "4.jpg",
      content: "Hackathon",
      size: "lg:col-span-1",
      color: "bg-primary",
    },
    {
      title: "Leaderboard",
      tag: "Carbon",
      src: "5.jpg",
      content: "Alexis Lours, toujours au top",
      size: "col-span-1",
      color: "bg-error",
    },
    {
      title: "Cours",
      tag: "Formation",
      src: "5.jpg",
      content: "Apprenez NestJS",
      size: "lg:col-span-2",
      color: "bg-primary",
    },
    {
      title: "Rdv",
      tag: "RH",
      src: "5.jpg",
      content: "RDV RH le 12/11",
      size: "col-span-2",
      color: "bg-base-100",
    },
    {
      title: "Carbon",
      tag: "Carbon",
      src: "5.jpg",
      content: "News content",
      size: "lg:col-span-1",
      color: "bg-primary",
    },
    {
      title: "Carbon",
      tag: "Carbon",
      src: "5.jpg",
      content: "News content",
      size: "lg:col-span-1",
      color: "bg-error",
    },
    {
      title: "Carbon",
      tag: "Carbon",
      src: "5.jpg",
      content: "News content",
      size: "lg:col-span-1",
      color: "bg-error",
    },
    {
      title: "Carbon",
      tag: "Carbon",
      src: "5.jpg",
      content: "News content",
      size: "lg:col-span-1",
      color: "bg-base-100",
    },
  ];
}
