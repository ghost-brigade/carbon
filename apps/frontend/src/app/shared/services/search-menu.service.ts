import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchMenuService {
  isOpen = false;
  selectedSkills$ = new BehaviorSubject<string[]>([]);
  selectedSocieties$ = new BehaviorSubject<string[]>([]);

  toggle() {
    this.isOpen = !this.isOpen;
  }

  toggleSkill(skill: string) {
    const selectedSkills = this.selectedSkills$.getValue();

    if (selectedSkills.includes(skill)) {
      return this.selectedSkills$.next(
        selectedSkills.filter((selectedSKill) => selectedSKill !== skill)
      );
    }

    this.selectedSkills$.next([...selectedSkills, skill]);
  }

  // toggleSociety(societyId: string) {
  //   const selectedSocieties = this.selectedSocieties$.getValue();

  //   if (selectedSocieties.includes(societyId)) {
  //     return this.selectedSocieties$.next(
  //       selectedSocieties.filter(
  //         (selectedSocietyId) => selectedSocietyId !== societyId
  //       )
  //     );
  //   }

  //   this.selectedSocieties$.next([...selectedSocieties, societyId]);
  // }
}
