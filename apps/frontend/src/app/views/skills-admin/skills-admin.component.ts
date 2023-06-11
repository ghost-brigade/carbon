import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { finalize } from "rxjs";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { DeleteEndpoint } from "../../constants/endpoints/delete.constants";
import { PatchEndpoint } from "../../constants/endpoints/patch.constants";
import { SkillType } from "@carbon/zod";
import { RequestService } from "../../shared/services/request.service";
import { LoaderService } from "../../core/components/loader/loader.service";
import { ToastService } from "../../core/components/toast/toast.service";
import { PostEndpoint } from "../../constants/endpoints/post.constants";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "carbon-skills-admin",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./skills-admin.component.html",
  styleUrls: ["./skills-admin.component.css"],
})
export class SkillsAdminComponent implements OnInit {
  requestService = inject(RequestService);
  loaderService = inject(LoaderService);
  toastService = inject(ToastService);
  data: SkillType[] | undefined;
  editItem: Partial<SkillType> = {};
  modalMode: "add" | "edit" = "add";
  emptyItem: Partial<SkillType> = {
    name: "",
  };

  ngOnInit(): void {
    this.loaderService.show();
    this.requestService
      .get({ endpoint: GetEndpoint.Skill })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.data = res;
        },
      });
  }

  showModal(selector: string, item: Partial<SkillType>, mode: "add" | "edit") {
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
        endpoint: PostEndpoint.Skill,
        body: { name: this.editItem.name || "" },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateItems();
          this.toastService.show("SUCCESS", "Skill créé");
        },
      });
  }

  editItemSubmit() {
    this.loaderService.show();
    this.requestService
      .patch({
        endpoint: PatchEndpoint.Skill,
        body: this.editItem as { name: string },
        params: { id: this.editItem.id as string },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.updateItems();

          this.toastService.show("SUCCESS", "Skill modifié");
        },
      });
  }

  deleteItemSubmit(id: string) {
    this.loaderService.show();
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.Skill,
        params: { id },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastService.show("SUCCESS", "Skill supprimé");
          this.updateItems();
        },
      });
  }

  updateItems() {
    this.loaderService.show();
    this.requestService
      .get({ endpoint: GetEndpoint.Skill })
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
