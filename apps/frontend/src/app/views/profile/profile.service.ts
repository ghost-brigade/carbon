import { Injectable, WritableSignal, computed, signal } from "@angular/core";
import { TaskList } from "../../shared/models/user.model";

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
  $selfTaskList: WritableSignal<TaskList[]> = signal([]);
  $mappedTaskList = computed(() => {
    return this.$selfTaskList().map((taskList) => {
      return {
        status: taskList.status,
        name: taskList.taskList.name,
        description: taskList.taskList.description,
        required: taskList.taskList.required,
        skill: taskList.taskList.skill.name,
        level: taskList.taskList.level,
      };
    });
  });

  $taskList = computed(() => {
    const levelsPerSkill: Record<
      string,
      Record<
        number,
        {
          status: string;
          name: string;
          description: string;
          required: boolean;
        }[]
      >
    > = {};

    this.$mappedTaskList().forEach((task) => {
      const { skill, level, status, name, description, required } = task;

      if (!levelsPerSkill[skill]) {
        levelsPerSkill[skill] = {};
      }

      if (!levelsPerSkill[skill][level]) {
        levelsPerSkill[skill][level] = [];
      }
      levelsPerSkill[skill][level].push({
        status,
        name,
        description,
        required,
      });
    });

    return levelsPerSkill;
  });

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
