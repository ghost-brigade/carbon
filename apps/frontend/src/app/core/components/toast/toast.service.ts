import { Injectable, WritableSignal, signal } from "@angular/core";
import type { ToastType } from "./toast.model";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  $isOpen = signal(false);

  $type: WritableSignal<ToastType> = signal("INFO");
  $message = signal("");
  $delay = signal(5000);

  /**
   * Show a toast message
   * @param type The type of the toast message
   * @param message The message to show
   * @param delay The delay in ms before the toast is hidden
   */
  show(type: ToastType, message: string, delay = 5000) {
    this.$type.set(type);
    this.$message.set(message);
    this.$delay.set(delay);
    this.$isOpen.set(true);
  }

  /**
   * Forcefully hide the current toast message
   */
  hide(): void {
    this.$isOpen.set(false);
  }
}
