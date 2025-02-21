// table/results.js
// Martin Pravda

// A main results component for displaying tabular data
// It subscribes from the opmet service in order to update its view

import type {Response} from "../../services/types";

import {Component, inject} from "@angular/core";
import {ErrorComponent} from "./error";
import {NoResultsComponent} from "./no-results";
import {OpmetService} from "../../services/opmet";
import {pick, formatTimestamp, formatText} from "../../utils";

@Component({
  selector: "results-ui",
  imports: [ErrorComponent, NoResultsComponent],
  templateUrl: "./results.html",
  styleUrl: "./results.css"
})
export class ResultsComponent {
  response?: Response;
  private opmetService = inject(OpmetService);

  get error() {
    return this.response?.error;
  }

  get results() {
    if (!this.response?.result) {
      return;
    }

    const result = Object.groupBy(
      this.response.result,
      ({stationId}) => stationId
    );

    return Object.entries(result).map(([key, values]) => {
      const vals = values?.map((obj) =>
        Object.values(
          // @ts-expect-error bad-typing
          pick<string>(obj, [
            "queryType",
            ["reportTime", formatTimestamp],
            ["text", formatText]
          ])
        )
      );
      return [key, vals];
    });
  }

  ngOnInit() {
    this.opmetService.data$.subscribe((response) => {
      this.response = response;
    });
  }
}
