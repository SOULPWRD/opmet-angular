// app/app.ts
// Martin Pravda

// An app entry point file

import {Component} from "@angular/core";
import {OpmetFormComponent} from "../form/opmet";
import {ResultsComponent} from "../table/results";

@Component({
  selector: "app-root",
  imports: [OpmetFormComponent, ResultsComponent],
  templateUrl: "./app.html",
  styleUrl: "./app.css"
})
export class AppComponent {}
