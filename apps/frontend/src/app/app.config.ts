import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { appRoutes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./core/guards/auth.guard";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(AuthGuard),
    importProvidersFrom(BrowserModule),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
