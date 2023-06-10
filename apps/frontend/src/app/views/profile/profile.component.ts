import { Component, OnInit, inject } from "@angular/core";
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

@Component({
  selector: "carbon-profile",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  requestService = inject(RequestService);
  loaderService = inject(LoaderService);
  profileService = inject(ProfileService);
  profile: GetUserType | undefined;
  getFormattedTime = getFormattedTime;
  getRank = getRank;
  xp: XP = {
    currentLevelXP: 0,
    level: 0,
    totalXP: 0,
    xpUntilNextLevel: 0,
  };
  ngOnInit(): void {
    this.loaderService.show();
    this.requestService
      .get({
        endpoint: GetEndpoint.Me,
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.profile = res;
          this.xp = this.profileService.calculateLevel(res.experience);
          console.log(this.xp);
        },
      });
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
}
