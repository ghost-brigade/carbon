import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import {
  TitleStrategy,
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from "@angular/router";
import { appRoutes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./core/guards/auth.guard";
import { AppPrefixTitleStrategy } from "./core/strategies/title.strategy";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      AuthGuard,
      BrowserAnimationsModule,
      HttpClientModule,
      BrowserModule
    ),
    importProvidersFrom(),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: TitleStrategy,
      useClass: AppPrefixTitleStrategy,
    },
  ],
};
