// table/error.ts
// Martin Pravda

// Display a simple error notification

import {Component, Input} from "@angular/core";

@Component({
  selector: "error-ui",
  styleUrl: "./error.css",
  templateUrl: "./error.html"
})
export class ErrorComponent {
  @Input() code: string = "";
  @Input() message: string = "";
}
