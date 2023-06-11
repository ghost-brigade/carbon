import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { finalize } from "rxjs";
import { RequestService } from "../../shared/services/request.service";
import { LoaderService } from "../../core/components/loader/loader.service";
import { EventType } from "@carbon/zod";

@Component({
  selector: "carbon-event",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.css"],
})
export class EventComponent implements OnInit {
  params = new URLSearchParams(document.location.search);
  // requestService = inject(RequestService);
  // loaderService = inject(LoaderService);
  event: EventType[] = [];

  constructor(
    private requestService: RequestService,
    private loaderService: LoaderService
  ) {}

  loadEvents(type: string | null) {
    this.loaderService.show();
    this.requestService
      .get({
        endpoint: GetEndpoint.Event,
        queryParams: { ...(type && { type }) },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (event) => {
          this.event = event;
        },
      });
  }

  ngOnInit(): void {
    const type = this.params.get("type");
    this.loadEvents(type);
  }

  // ngOnInit(): void {
  //   const type = this.params.get("type");

  //   loadEvents(type: string) {
  //     this.loaderService.show();
  //     this.requestService
  //       .get({
  //         endpoint: GetEndpoint.Event,
  //         queryParams: { ...(type && { type }), },
  //       })
  //       .pipe(finalize(() => this.loaderService.hide()))
  //       .subscribe({
  //         next: (event) => {
  //           this.event = event;
  //         },
  //       });
  //   }

  //   this.loaderService.show();
  //   this.requestService
  //     .get({
  //       endpoint: GetEndpoint.Event,
  //       queryParams: {
  //         ...(type && { type }),
  //       },
  //     })
  //     .pipe(finalize(() => this.loaderService.hide()))
  //     .subscribe({
  //       next: (event) => {
  //         this.event = event;
  //       },
  //     });
  // }
}
