import { Component, computed, effect } from "@angular/core";
import { ToastService } from "./toast.service";
import { TOAST_ANIMATION } from "./toast.animation";
import { NgIf } from "@angular/common";

@Component({
  selector: "carbon-toast",
  templateUrl: "./toast.component.html",
  animations: TOAST_ANIMATION,
  standalone: true,
  imports: [NgIf],
})
export class ToastComponent {
  constructor(private toastService: ToastService) {
    effect(() => {
      if (this.toastService.$isOpen()) {
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
          this.hide();
        }, this.$delay());
      }
    });
  }

  $visible = computed(() => this.toastService.$isOpen());
  $delay = computed(() => this.toastService.$delay());
  $type = computed(() => this.toastService.$type());
  $message = computed(() => this.toastService.$message());
  timeout = -1;

  /**
   * Forcefully hide the current toast message
   */
  hide(): void {
    clearTimeout(this.timeout);
    this.toastService.hide();
  }
}
