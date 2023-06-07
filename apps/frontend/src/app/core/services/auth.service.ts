import { Injectable, WritableSignal, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  $isLoggedIn = signal(true);
  $roles: WritableSignal<string[]> = signal([]);
}
