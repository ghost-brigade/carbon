import {
  Component,
  OnInit,
  WritableSignal,
  computed,
  inject,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RequestService } from "../../shared/services/request.service";
import { ProfileService } from "../profile/profile.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { LoaderService } from "../../core/components/loader/loader.service";
import { finalize, forkJoin, map } from "rxjs";
import { PostEndpoint } from "../../constants/endpoints/post.constants";

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
  stackTasks: string[] = [];
  $availableTasks: WritableSignal<
    {
      name: string;
      description: string;
      required: boolean;
      status: string;
      level: number;
      skill: { name: string };
    }[][]
  > = signal([]);
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
          this.profileService.$selfTaskList.set(res.taskLists);
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
                const skills = res.map((skill) => {
                  const skillName = skill.name;
                  const tasks = skill.taskLists.map((task) => {
                    return {
                      name: task.name,
                      description: task.description,
                      required: task.required,
                      id: task.id,
                      status: "todo",
                      level: task.level,
                      skill: {
                        name: skillName,
                      },
                    };
                  });
                  return tasks;
                });
                return skills.filter((skill) => skill.length > 0);
              })
            )
            .subscribe({
              next: (res) => {
                console.log(this.profileService.$taskList());
                res.forEach((skill) => {
                  skill.map((task) => {
                    if (!this.profileService.$taskList()[task.skill.name]) {
                      this.profileService.$taskList()[task.skill.name] = {};
                    }
                    if (
                      !this.profileService.$taskList()[task.skill.name][
                        task.level
                      ]
                    ) {
                      this.profileService.$taskList()[task.skill.name][
                        task.level
                      ] = [];
                    }
                    this.profileService
                      .$taskList()
                      [task.skill.name][task.level].push({
                        status: task.status,
                        name: task.name,
                        id: task.id,
                        description: task.description,
                        required: task.required,
                      });
                  });
                });
                console.log(this.profileService.$taskList());
              },
            });
        },
      });
  }

  updateTask(
    task: {
      status: string;
      name: string;
      description: string;
      id: string;
      required: boolean;
    },
    level: number
  ) {
    if (task.status !== "todo") return;
    this.requestService
      .post({
        endpoint: PostEndpoint.TaskList,
        body: {
          taskListId: task.id,
          status: "pending",
        },
      })
      .subscribe({
        next: () => {
          this.profileService.$taskList()[task.name][level].forEach((t) => {
            if (t.id === task.id) {
              t.status = "pending";
            }
          });
        },
      });
  }
}
