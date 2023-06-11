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
import { PatchEndpoint } from "../../constants/endpoints/patch.constants";
import { ToastService } from "../../core/components/toast/toast.service";

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
  toastService = inject(ToastService);
  data: NewsType[] | undefined;
  editItem: Partial<NewsType> = {
    title: "",
    content: "",
    src: "",
  };
  modalMode: "add" | "edit" = "add";
  emptyItem: Partial<NewsType> = {
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

          this.toastService.show("SUCCESS", "Article créé");
          this.updateItems();
        },
      });
  }

  editItemSubmit() {
    this.loaderService.show();
    this.requestService
      .patch({
        endpoint: PatchEndpoint.News,
        body: this.editItem,
        params: { id: this.editItem.id as string },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);

          this.toastService.show("SUCCESS", "Article modifié");
          this.updateItems();
        },
      });
  }

  deleteItemSubmit(id: string) {
    this.loaderService.show();
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.News,
        params: { id },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastService.show("SUCCESS", "Article supprimé");
          this.updateItems();
        },
      });
  }

  updateItems() {
    this.loaderService.show();
    this.requestService
      .get({ endpoint: GetEndpoint.News })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.closeModal("edit-modal");
          this.data = res;
        },
      });
  }

  closeModal(selector: string) {
    (
      document.getElementById(selector) as HTMLElement & {
        close: () => void;
      }
    ).close();
  }
}
