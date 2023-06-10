import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { appRoutes } from "../../../app.routes";
import { AuthService } from "../../services/auth.service";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from "@angular/router";
import { finalize, filter, map } from "rxjs";
import { RequestService } from "../../../shared/services/request.service";
import { LoaderService } from "../loader/loader.service";
import { GetEndpoint } from "../../../constants/endpoints/get.constants";

@Component({
  selector: "carbon-navbar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  loaderService = inject(LoaderService);
  requestService = inject(RequestService);
  $currentRoute = signal("search");
  $isLoggedIn = computed(() => this.authService.$isLoggedIn());
  $hasAdmin = signal(false);
  tiles = computed(() => {
    if (!this.authService.$isLoggedIn()) {
      return [];
    } else {
      return appRoutes
        .filter(
          (route) =>
            route.data?.["hidden"] === false &&
            route.data?.["roles"].includes(this.authService.$role())
        )
        .sort((a, b) => {
          if (a.data?.["order"] && b.data?.["order"]) {
            return a.data["order"] - b.data["order"];
          } else if (a.data?.["order"]) {
            return -1;
          } else if (b.data?.["order"]) {
            return 1;
          } else {
            return 0;
          }
        });
    }
  });

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.$currentRoute.set(event.urlAfterRedirects.replace("/", ""));
      }
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let currentRoute = this.route;
          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }
          return currentRoute;
        }),
        map((route) => route.snapshot.data)
      )
      .subscribe((data) => {
        if (
          data?.["roles"] &&
          !data["roles"].includes(this.authService.$role())
        ) {
          this.router.navigate(["/" + this.tiles()[0].path]);
        } else {
          this.$hasAdmin.set(
            data["hasAdmin"] && this.authService.$role() === "hr"
          );
        }
      });
  }

  /**
   * Computes the width of a tile at a given index.
   * The width of the tile can either be "1" or "2".
   * If the index is a multiple of 3, the width is "2".
   * If the tile is the last in the list and its width is "1", and the total number of tiles is one less than a multiple of 3, the width is adjusted to "2".
   * In all other cases, the width is "1".
   *
   * @param index - The index of the tile whose width is to be determined.
   * @returns - The width of the tile at the specified index.
   */
  getTileWidth(index: number): "1" | "2" {
    const size = index % 3 === 0 ? "2" : "1";

    if (
      index === this.tiles().length - 1 &&
      size === "1" &&
      this.tiles().length % 3 === 2
    ) {
      return "2";
    }

    return size;
  }

  logout() {
    this.loaderService.show();
    this.requestService
      .get({
        endpoint: GetEndpoint.Logout,
      })
      .pipe(
        finalize(() => {
          this.authService.logout();
          this.router.navigate(["/login"]);
          this.loaderService.hide();
        })
      )
      .subscribe({});
  }

  gotoAdmin() {
    this.router.navigate(["/" + this.$currentRoute() + "/admin"]);
  }
}
