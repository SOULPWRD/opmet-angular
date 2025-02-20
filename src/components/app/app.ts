// app.ts
// Martin Pravda

// An app entry point file

import {Component} from "@angular/core";
import {OpmetForm} from "../form/opmet";
import {Results} from "../table/results";

@Component({
  selector: "app-root",
  imports: [OpmetForm, Results],
  templateUrl: "./app.html",
  styleUrl: "./app.css"
})
export class AppComponent {}
