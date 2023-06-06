import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { LoaderComponent } from "./core/loader/loader.component";

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, LoaderComponent],
  selector: "carbon-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {}
