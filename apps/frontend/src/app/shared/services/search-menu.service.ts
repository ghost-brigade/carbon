import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

type OrderBy = "lastName:asc" | "lastName:desc";

@Injectable({
  providedIn: "root",
})
export class SearchMenuService {
  isOpen = false;
  selectedSkills$ = new BehaviorSubject<string[]>([]);
  selectedSocieties$ = new BehaviorSubject<string[]>([]);
  order$ = new BehaviorSubject<OrderBy>("lastName:asc");
  search$ = new BehaviorSubject<string>("");

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

  toggleOrder() {
    const order = this.order$.getValue();

    if (order === "lastName:asc") {
      return this.order$.next("lastName:desc");
    }

    this.order$.next("lastName:asc");
  }

  setSearch(search: string) {
    this.search$.next(search);
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
