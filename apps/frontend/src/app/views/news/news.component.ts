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
  news: any;
  ngOnInit(): void {
    this.loaderService.show();
    this.requestService
      .get({
        endpoint: GetEndpoint.News,
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          this.news = res;
        },
      });
  }
}
