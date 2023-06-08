import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestService } from "../../shared/services/request.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { finalize } from "rxjs";
import { LoaderService } from "../../core/components/loader/loader.service";
import { ProfileService, XP } from "./profile.service";
import { UserType } from "@carbon/zod";

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
  profile: (UserType & any) | undefined;
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

  getYearsOfExperience(): string {
    if (!this.profile) return "0";
    const startDate = this.profile.entryDate;

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

  uniqueBadges() {
    if (!this.profile) return [];
    // @ts-ignore
    // remove duplicate object based on 'achievement' property
    return this.profile.UserAchievement.reduce((acc, current) => {
      const x = acc.find(
        (item: any) => item.achievement === current.achievement
      );
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []).slice(0, 3);
  }

  showModal(id: string) {
    (
      document.getElementById(id) as HTMLElement & { showModal: () => void }
    ).showModal();
  }

  getRank(): string {
    switch (true) {
      case this.xp.level <= 10:
        return "🌱";
      case this.xp.level <= 20:
        return "🌲";
      case this.xp.level <= 30:
        return "🏆";
      case this.xp.level <= 40:
        return "⭐️";
      case this.xp.level <= 50:
        return "👑";
      default:
        return "💎";
    }
  }

  getStartDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString();
  }

  getYears(school: any): string {
    const startDate = new Date(school.dateStart);
    const endDate = new Date(school.dateEnd);

    return `${startDate.getFullYear()} - ${endDate.getFullYear()}`;
  }
}
