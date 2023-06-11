import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestService } from "../../shared/services/request.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { ToastService } from "../../core/components/toast/toast.service";
import { ProfileService } from "../profile/profile.service";
import { LoaderService } from "../../core/components/loader/loader.service";
import { finalize } from "rxjs";
import { getFormattedTime, getYear } from "../../shared/utils/format";
import { GetUserType } from "../../shared/models/user.model";
import { RouterModule } from "@angular/router";
@Component({
  selector: "carbon-leaderboard",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.css"],
})
export class LeaderboardComponent implements OnInit {
  requestService = inject(RequestService);
  toastService = inject(ToastService);
  profileService = inject(ProfileService);
  loaderService = inject(LoaderService);
  missionLeaderboard: WritableSignal<
    (GetUserType & { _count: { missions: number } })[]
  > = signal([]);
  seniorityLeaderboard: WritableSignal<GetUserType[]> = signal([]);
  levelLeaderboard: WritableSignal<GetUserType[]> = signal([]);
  selectTab: WritableSignal<"experience" | "seniority" | "missions"> =
    signal("experience");
  getFormattedTime = getFormattedTime;
  getYear = getYear;

  ngOnInit(): void {
    this.loaderService.show();
    this.requestService
      .get({
        endpoint: GetEndpoint.Leaderboard,
        params: {
          leaderboard: "experience",
        },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          this.levelLeaderboard.set(res);
        },
        error: () => {
          this.toastService.show(
            "ERROR",
            "Erreur lors du chargement du leaderboard"
          );
        },
      });

    this.requestService
      .get({
        endpoint: GetEndpoint.Leaderboard,
        params: {
          leaderboard: "seniority",
        },
      })
      .subscribe({
        next: (res) => {
          this.seniorityLeaderboard.set(res);
        },
        error: () => {
          this.toastService.show(
            "ERROR",
            "Erreur lors du chargement du leaderboard"
          );
        },
      });

    this.requestService
      .get({
        endpoint: GetEndpoint.Leaderboard,
        params: {
          leaderboard: "mission",
        },
      })
      .subscribe({
        next: (res) => {
          this.missionLeaderboard.set(
            res as (GetUserType & { _count: { missions: number } })[]
          );
        },
        error: () => {
          this.toastService.show(
            "ERROR",
            "Erreur lors du chargement du leaderboard"
          );
        },
      });
  }

  getLevel(user: GetUserType) {
    return this.profileService.calculateLevel(user.experience).level;
  }

  setTab(tab: "experience" | "seniority" | "missions") {
    this.selectTab.set(tab);
  }
}
