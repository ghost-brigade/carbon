import { Injectable } from "@angular/core";
import { RequestService } from "../../shared/services/request.service";
import { GetEndpoint } from "../../constants/endpoints/get.constants";

@Injectable({
  providedIn: "root",
})
export class SocietyService {
  constructor(private requestService: RequestService) {}

  getSocieties() {
    return this.requestService.get({
      endpoint: GetEndpoint.Society,
    });
  }
}
