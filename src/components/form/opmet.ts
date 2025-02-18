import type {Param} from "../../services/types";
import type {FormArray} from "@angular/forms";
import {Component, inject} from "@angular/core";
import {FormBuilder, FormControl} from "@angular/forms";
import {OpmetService} from "../../services/opmet";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: "opmet-form-ui",
  imports: [ReactiveFormsModule],
  templateUrl: "./opmet.html",
  styleUrl: "./opmet.css"
})
export class OpmetForm {
  private formBuilder = inject(FormBuilder);
  private opmetService = inject(OpmetService);

  opmetForm = this.formBuilder.group({
    reportTypes: this.formBuilder.array([]),
    countries: [""],
    stations: [""]
  });

  updateMessageType(event: Event): void {
    const reportTypes = this.opmetForm.get("reportTypes") as FormArray;
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;
    const value = inputElement.value.toUpperCase();

    if (checked) {
      reportTypes.push(new FormControl(value));
      return;
    }

    const index = reportTypes.controls.findIndex(
      (ctrl) => ctrl.value === value
    );

    if (index !== -1) {
      reportTypes.removeAt(index);
    }
  }

  get payload(): Param {
    const values = this.opmetForm.value;
    return {
      id: crypto.randomUUID(),
      reportTypes: values.reportTypes as string[],
      countries: values.countries?.split(" ") || [],
      stations: values.stations?.split(" ") || []
    };
  }

  fetch() {
    this.opmetService.get(this.payload);
  }
}
