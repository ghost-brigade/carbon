import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { finalize } from "rxjs";
import { DeleteEndpoint } from "../../constants/endpoints/delete.constants";
import { PatchEndpoint } from "../../constants/endpoints/patch.constants";
import { PostEndpoint } from "../../constants/endpoints/post.constants";
import { SocietyType } from "@carbon/zod";
import { LoaderService } from "../../core/components/loader/loader.service";
import { RequestService } from "../../shared/services/request.service";
import { FormsModule } from "@angular/forms";
import { ToastService } from "../../core/components/toast/toast.service";

@Component({
  selector: "carbon-society-admin",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./society-admin.component.html",
  styleUrls: ["./society-admin.component.css"],
})
export class SocietyAdminComponent implements OnInit {
  requestService = inject(RequestService);
  loaderService = inject(LoaderService);
  toastService = inject(ToastService);
  data: SocietyType[] | undefined;
  editItem: Partial<SocietyType> = {};
  modalMode: "add" | "edit" = "add";
  emptyItem: Partial<SocietyType> = {
    name: "",
  };

  ngOnInit(): void {
    this.loaderService.show();
    this.requestService
      .get({ endpoint: GetEndpoint.Society })
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
    item: Partial<SocietyType>,
    mode: "add" | "edit"
  ) {
    this.editItem = item;
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
        endpoint: PostEndpoint.Society,
        body: this.editItem,
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateItems();
          this.toastService.show("SUCCESS", "Société créée");
        },
      });
  }

  editItemSubmit() {
    this.loaderService.show();
    this.requestService
      .patch({
        endpoint: PatchEndpoint.Society,
        body: this.editItem,
        params: { id: this.editItem.id as string },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateItems();

          this.toastService.show("SUCCESS", "Société modifiée");
        },
      });
  }

  deleteItemSubmit(id: string) {
    this.loaderService.show();
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.Society,
        params: { id },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastService.show("SUCCESS", "Société supprimée");
          this.updateItems();
        },
      });
  }

  updateItems() {
    this.loaderService.show();
    this.requestService
      .get({ endpoint: GetEndpoint.Society })
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
