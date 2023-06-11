import { Component, OnInit, computed, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestService } from "../../shared/services/request.service";
import { ProfileService } from "../profile/profile.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { LoaderService } from "../../core/components/loader/loader.service";
import { finalize, forkJoin, map } from "rxjs";
import { TaskList } from "../../shared/models/user.model";

@Component({
  selector: "carbon-tasklist",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./tasklist.component.html",
})
export class TasklistComponent implements OnInit {
  requestService = inject(RequestService);
  profileService = inject(ProfileService);
  loaderService = inject(LoaderService);
  userTask: TaskList[] = [];
  stackTasks: string[] = [];
  $tasklist = computed(() => this.profileService.$taskList());
  ngOnInit(): void {
    this.loaderService.show();
    this.requestService
      .get({
        endpoint: GetEndpoint.Me,
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          //this.profileService.$selfTaskList.set(res.taskLists);
          this.userTask = res.taskLists;
          this.stackTasks = res.skills.map((skill) => skill.skillId);
          console.log(this.stackTasks);
          const skillRequests = res.skills.map((skill) =>
            this.requestService.get({
              endpoint: GetEndpoint.SkillById,
              params: { id: skill.skillId },
            })
          );
          this.loaderService.show();

          forkJoin(skillRequests)
            .pipe(finalize(() => this.loaderService.hide()))
            .pipe(
              map((res) => {
                const val = res.map((skill) => {
                  const skillName = skill.name;
                  return {
                    ...skill.taskLists,
                    skill: {
                      name: skillName,
                    },
                  };
                });
                return val;
              })
            )
            .subscribe({
              next: (res) => {
                console.log(res);
              },
            });
        },
      });
  }
}
