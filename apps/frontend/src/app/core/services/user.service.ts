import { Injectable } from "@angular/core";
import { RequestService } from "../../shared/services/request.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private requestService: RequestService) {}

  getUsers() {
    return this.requestService.get({
      endpoint: GetEndpoint.User,
      queryParams: {},
    });
  }

  getUsersBySkills(skills: string[]) {
    return this.requestService.get({
      endpoint: GetEndpoint.User,
      queryParams: {
        skills: skills.join(","),
      },
    });
  }
}
