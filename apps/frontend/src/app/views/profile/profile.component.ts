import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestService } from "../../shared/services/request.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { finalize } from "rxjs";
import { LoaderService } from "../../core/components/loader/loader.service";
import { ProfileService, XP } from "./profile.service";
import { getFormattedTime, getRank } from "../../shared/utils/format";
import {
  GetUserType,
  School,
  UserAchievement,
} from "../../shared/models/user.model";
import { AuthService } from "../../core/services/auth.service";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { DeleteEndpoint } from "../../constants/endpoints/delete.constants";
import { ToastService } from "../../core/components/toast/toast.service";
import { PostEndpoint } from "../../constants/endpoints/post.constants";
import { ChartComponent } from "../../shared/components/chart/chart.component";
import {
  AreaStyleOptions,
  ChartOptions,
  DeepPartial,
  SeriesOptionsCommon,
} from "lightweight-charts";

@Component({
  selector: "carbon-profile",
  standalone: true,
  imports: [CommonModule, FormsModule, ChartComponent, RouterModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  requestService = inject(RequestService);
  loaderService = inject(LoaderService);
  profileService = inject(ProfileService);
  authService = inject(AuthService);
  toastService = inject(ToastService);
  $isSelfProfile = signal(false);
  $profilePicture = computed(() => this.authService.$userPicture());
  $suggestionsActive = signal(false);
  $role = computed(() => this.authService.$role());
  profile: GetUserType | undefined;
  newPreference = "";
  preferenceTimeout = -1;
  preferences: string[] = [];
  getFormattedTime = getFormattedTime;
  getRank = getRank;
  xp: XP = {
    currentLevelXP: 0,
    level: 0,
    totalXP: 0,
    xpUntilNextLevel: 0,
  };

  chartOptions: DeepPartial<AreaStyleOptions & SeriesOptionsCommon> = {
    baseLineColor: "#ffffff",
    priceFormat: {
      minMove: 1,
    },
  };

  canvasOptions: DeepPartial<ChartOptions> = {
    layout: {
      background: {
        color: "#282B2A",
      },
      textColor: "#ffffff",
    },
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loaderService.show();
    const userId = this.route.snapshot.paramMap.get("id");
    if (!userId) {
      this.requestService
        .get({
          endpoint: GetEndpoint.Me,
        })
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe({
          next: (res) => {
            this.profile = res;
            this.xp = this.profileService.calculateLevel(res.experience);
            this.$isSelfProfile.set(true);
          },
        });
    } else {
      this.requestService
        .get({
          endpoint: GetEndpoint.UserProfile,
          params: {
            id: userId,
          },
        })
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe({
          next: (res) => {
            this.profile = res;
            this.xp = this.profileService.calculateLevel(res.experience);
          },
        });
    }
  }

  uniqueBadges() {
    if (!this.profile) return [];
    return this.profile.UserAchievement.reduce((acc, current) => {
      const x = acc.find((item) => item.achievement === current.achievement);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [] as UserAchievement[]).slice(0, 3);
  }

  getSortedSkills() {
    return this.profile?.skills.sort((a, b) => {
      return b.level - a.level;
    });
  }

  showModal(id: string) {
    (
      document.getElementById(id) as HTMLElement & { showModal: () => void }
    ).showModal();
  }

  getStartDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  getYears(school: School): string {
    const startDate = new Date(school.dateStart);
    const endDate = new Date(school.dateEnd);

    return `${startDate.getFullYear()} - ${endDate.getFullYear()}`;
  }

  deletePreference(id: string) {
    this.requestService
      .delete({
        endpoint: DeleteEndpoint.UserPreference,
        params: {
          id,
        },
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: () => {
          this.profile?.UserPreference.splice(
            this.profile.UserPreference.findIndex((p) => p.id === id),
            1
          );
        },
        error: () => {
          this.toastService.show(
            "ERROR",
            "Une erreur est survenue lors de la suppression de la préférence"
          );
        },
      });
  }

  searchPreference() {
    if (this.newPreference.length === 0) {
      this.preferences = [];
      return;
    }
    clearTimeout(this.preferenceTimeout);
    this.preferenceTimeout = window.setTimeout(() => {
      this.requestService
        .get({
          endpoint: GetEndpoint.SearchUserPreference,
          queryParams: {
            description: this.newPreference,
          },
        })
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe({
          next: (res) => {
            this.preferences = res;
          },
        });
    }, 500);
  }

  addPreference(isLiked: boolean) {
    this.requestService
      .post({
        endpoint: PostEndpoint.UserPreference,
        body: {
          description: this.newPreference,
          isLiked,
        },
      })
      .pipe(
        finalize(() => ((this.newPreference = ""), (this.preferences = [])))
      )
      .subscribe({
        next: (res) => {
          if (this.profile?.UserPreference)
            this.profile.UserPreference = res.UserPreference;
        },
        error: (err) => {
          if (err.status === 400) {
            this.toastService.show("ERROR", "Vous avez déjà cette préférence");
          } else if (err.status === 422) {
            this.toastService.show(
              "ERROR",
              "Nombre maximum de préférences atteint"
            );
          } else {
            this.toastService.show("ERROR", "Une erreur est survenue");
          }
        },
      });
  }

  setSuggestionsActive(active: boolean) {
    // add a timeout to avoid the suggestions to be hidden when clicking on them
    setTimeout(() => {
      this.$suggestionsActive.set(active);
    }, 100);
  }

  setPreference(preference: string) {
    this.newPreference = preference;
  }

  mapSalaryHistory() {
    return (
      this.profile?.salary
        .map((salary) => {
          return {
            time: salary.date.split("T")[0],
            value: salary.amount,
          };
        })
        .sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        ) || []
    );
  }
}
