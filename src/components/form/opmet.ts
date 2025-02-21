// form/opmet.ts
// Martin Pravda

// A form for manipulating user inputs
// It uses a reactive form builder

import type {Param} from "../../services/types";
import type {FormArray} from "@angular/forms";
import {Component, inject} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  AbstractControl,
  Validators
} from "@angular/forms";
import {OpmetService} from "../../services/opmet";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: "opmet-form-ui",
  imports: [ReactiveFormsModule],
  templateUrl: "./opmet.html",
  styleUrl: "./opmet.css"
})
export class OpmetFormComponent {
  private formBuilder = inject(FormBuilder);
  private opmetService = inject(OpmetService);

  opmetForm = this.formBuilder.group(
    {
      reportTypes: this.formBuilder.array([], this.minLengthArray(1)),
      countries: [""],
      stations: [""]
    },
    {validators: [this.atLeastOneRequiredValidator]}
  );

  get reportTypes() {
    return this.opmetForm.get("reportTypes") as FormArray;
  }

  updateMessageType(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;
    const value = inputElement.value.toUpperCase();

    if (checked) {
      this.reportTypes.push(new FormControl(value, Validators.required));
      return;
    }

    const index = this.reportTypes.controls.findIndex(
      (ctrl) => ctrl.value === value
    );

    if (index !== -1) {
      this.reportTypes.removeAt(index);
    }
  }

  minLengthArray(min: number) {
    return (control: AbstractControl) => {
      const array = control as FormArray;
      return array.length >= min ? null : {minLengthArray: control?.touched};
    };
  }

  atLeastOneRequiredValidator(group: AbstractControl) {
    const countries = group.get("countries");
    const stations = group.get("stations");

    if (!countries?.value && !stations?.value) {
      return {atLeastOneRequired: countries?.dirty || stations?.dirty};
    }

    return null;
  }

  get payload(): Param {
    const values = this.opmetForm.value;
    return {
      id: crypto.randomUUID(),
      reportTypes: values.reportTypes as string[],
      countries:
        values.countries?.toUpperCase().split(" ").filter(Boolean) || [],
      stations: values.stations?.toUpperCase().split(" ").filter(Boolean) || []
    };
  }

  fetch() {
    this.opmetService.get(this.payload);
  }
}
