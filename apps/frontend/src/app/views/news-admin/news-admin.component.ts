import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NewsType } from "@carbon/zod";
import { RequestService } from "../../shared/services/request.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { LoaderService } from "../../core/components/loader/loader.service";
import { finalize } from "rxjs";
import { DeleteEndpoint } from "../../constants/endpoints/delete.constants";
import { FormsModule } from "@angular/forms";
import { PostEndpoint } from "../../constants/endpoints/post.constants";

@Component({
  selector: "carbon-news-admin",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./news-admin.component.html",
  styleUrls: ["./news-admin.component.css"],
})
export class NewsAdminComponent implements OnInit {
  requestService = inject(RequestService);
  loaderService = inject(LoaderService);
  data: NewsType[] | undefined;
  editItem: Partial<NewsType> = {
    title: "",
    content: "",
    src: "",
  };
  modalMode: "add" | "edit" = "add";
  emptyArticle: Partial<NewsType> = {
    title: "",
    content: "",
    src: "",
  };

  ngOnInit(): void {
    this.loaderService.show();
    this.requestService
      .get({ endpoint: GetEndpoint.News })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.data = res;
        },
      });
  }

  deleteItem(id: string) {
    this.loaderService.show();
  }

  showModal(
    selector: string,
    article: Partial<NewsType>,
    mode: "add" | "edit"
  ) {
    this.editItem = article;
    console.log(this.editItem);
    this.modalMode = mode;
    (
      document.getElementById(selector) as HTMLElement & {
        showModal: () => void;
      }
    ).showModal();
  }

  addItemSubmit() {
    this.loaderService.show();
    this.requestService
      .post({
        endpoint: PostEndpoint.News,
        body: this.editItem,
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.data = res;
        },
      });
  }

  editItemSubmit() {
    this.loaderService.show();
    this.requestService
      .patch({
        endpoint: PatchEndpoint.News,
        body: this.editItem,
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.data = res;
        },
      });
  }

  deleteItemSubmit() {
    this.loaderService.show();
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.News,
        params: { id: this.editItem.id },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.data = res;
        },
      });
  }
}
