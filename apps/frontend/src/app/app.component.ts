import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SplashScreen } from "@capacitor/splash-screen";
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { LoaderComponent } from "./core/components/loader/loader.component";

@Component({
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    LoaderComponent,
    NavbarComponent,
  ],
  selector: "carbon-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    SplashScreen.hide();
  }
}
