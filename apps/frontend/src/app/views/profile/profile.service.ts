import { Injectable } from "@angular/core";

export type XP = {
  level: number;
  totalXP: number;
  currentLevelXP: number;
  xpUntilNextLevel: number;
};
@Injectable({
  providedIn: "root",
})
export class ProfileService {
  calculateLevel(xp: number) {
    let level = 0;
    const multiplier = 20;
    while ((level + 1) * (level + 1) * multiplier <= xp) {
      level++;
    }

    const totalXP = xp;
    const currentLevelXP = level === 0 ? xp : xp - level * level * multiplier;
    const xpUntilNextLevel = (level + 1) * (level + 1) * multiplier - xp;

    return {
      level: level,
      totalXP: totalXP,
      currentLevelXP: currentLevelXP,
      xpUntilNextLevel: xpUntilNextLevel,
    };
  }
}
