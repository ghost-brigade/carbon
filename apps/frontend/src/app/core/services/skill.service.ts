import { Injectable } from "@angular/core";
import { RequestService } from "../../shared/services/request.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";

@Injectable({
  providedIn: "root",
})
export class SkillService {
  constructor(private requestService: RequestService) {}

  getSkills() {
    return this.requestService.get({
      endpoint: GetEndpoint.Skill,
    });
  }
}
