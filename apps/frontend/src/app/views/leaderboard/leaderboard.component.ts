import {
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestService } from "../../shared/services/request.service";
import { UserType } from "@carbon/zod";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { ToastService } from "../../core/components/toast/toast.service";
import { ProfileService } from "../profile/profile.service";
import { LoaderService } from "../../core/components/loader/loader.service";
import { finalize } from "rxjs";
@Component({
  selector: "carbon-leaderboard",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.css"],
})
export class LeaderboardComponent implements OnInit {
  requestService = inject(RequestService);
  toastService = inject(ToastService);
  profileService = inject(ProfileService);
  loaderService = inject(LoaderService);
  missionLeaderboard: WritableSignal<UserType[]> = signal([]);
  seniorityLeaderboard: WritableSignal<UserType[]> = signal([]);
  levelLeaderboard: WritableSignal<UserType[]> = signal([]);
  selectTab: WritableSignal<"experience" | "seniority"> = signal("experience");

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
  }

  getLevel(user: UserType) {
    return this.profileService.calculateLevel(user.experience).level;
  }

  setTab(tab: "experience" | "seniority") {
    this.selectTab.set(tab);
  }

  getYearsOfExperience(user: UserType): string {
    const startDate = user.entryDate;

    const today = new Date();
    const start = new Date(startDate);
    const years = today.getFullYear() - start.getFullYear();
    const months = today.getMonth() - start.getMonth();
    const days = today.getDate() - start.getDate();
    if (years > 0) return years + (years === 1 ? " an" : " ans");
    if (months > 0) return months + (months === 1 ? " mois" : " mois");
    if (days > 0) return days + (days === 1 ? " jour" : " jours");
    return "0";
  }

  getStartYear(user: UserType): string {
    const startDate = user.entryDate;
    const start = new Date(startDate);
    return start.getFullYear().toString();
  }
}
