// main.ts
// Martin Pravda

// An application bootstrapping

import {bootstrapApplication} from "@angular/platform-browser";
import {appConfig} from "./components/app/config";
import {AppComponent} from "./components/app/app";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
