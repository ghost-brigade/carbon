import { Injectable } from "@angular/core";
import { RequestService } from "../../shared/services/request.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";
import { UserParamsType } from "@carbon/zod";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private requestService: RequestService) {}

  getUsers(queryParams: UserParamsType) {
    return this.requestService.get({
      endpoint: GetEndpoint.User,
      queryParams,
    });
  }
}
