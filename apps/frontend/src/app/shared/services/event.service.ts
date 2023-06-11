import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventService {
  isOpen = false;
  eventSelected$ = new BehaviorSubject<string>("");

  toggle() {
    this.isOpen = !this.isOpen;
  }

  setSearch(event: string) {
    this.eventSelected$.next(event);
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
