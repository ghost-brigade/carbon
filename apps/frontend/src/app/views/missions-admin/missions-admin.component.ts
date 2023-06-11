import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestService } from "../../shared/services/request.service";
import { LoaderService } from "../../core/components/loader/loader.service";
import { ToastService } from "../../core/components/toast/toast.service";
import { MissionType } from "@carbon/zod";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { finalize } from "rxjs";
import { PostEndpoint } from "../../constants/endpoints/post.constants";
import { PatchEndpoint } from "../../constants/endpoints/patch.constants";
import { DeleteEndpoint } from "../../constants/endpoints/delete.constants";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "carbon-missions-admin",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./missions-admin.component.html",
  styleUrls: ["./missions-admin.component.css"],
})
export class MissionsAdminComponent implements OnInit {
  requestService = inject(RequestService);
  loaderService = inject(LoaderService);
  toastService = inject(ToastService);
  data: MissionType[] | undefined;
  editItem: Partial<MissionType> = {
    name: "",
    averageDailyRate: "0",
  };
  modalMode: "add" | "edit" = "add";
  emptyItem: Partial<MissionType> = {
    name: "",
    averageDailyRate: "0",
  };

  ngOnInit(): void {
    this.loaderService.show();
    this.requestService
      .get({ endpoint: GetEndpoint.Mission })
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
    item: Partial<MissionType>,
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
        endpoint: PostEndpoint.Mission,
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
        endpoint: PatchEndpoint.Mission,
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
        endpoint: DeleteEndpoint.Mission,
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
      .get({ endpoint: GetEndpoint.Mission })
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
