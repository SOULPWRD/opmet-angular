import {TestBed} from "@angular/core/testing";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {OpmetFormComponent} from "./opmet";
import {FormArray, FormControl} from "@angular/forms";

const updateForm = (
  form: OpmetFormComponent,
  data: {reportTypes: string[]; stations: string; countries: string}
) => {
  form.opmetForm.patchValue({
    stations: data.stations,
    countries: data.countries
  });

  // This a small hack I needed to do in order push data into reportTypes formArray
  const reportTypesControl = form.opmetForm.get("reportTypes") as FormArray;

  while (reportTypesControl.length) {
    reportTypesControl.removeAt(0);
  }

  data.reportTypes.forEach((type) =>
    reportTypesControl.push(new FormControl(type))
  );
};

describe("OpmetFormComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpmetFormComponent],
      providers: [provideHttpClient(withFetch()), provideHttpClientTesting()]
    }).compileComponents();
  });

  it("updates the the form component", () => {
    const fixture = TestBed.createComponent(OpmetFormComponent);
    const form = fixture.componentInstance;

    expect(form.opmetForm.value).toEqual({
      reportTypes: [],
      stations: "",
      countries: ""
    });

    const formData = {
      stations: "LZIB EGGL",
      countries: "SQ",
      reportTypes: ["METAR"]
    };

    updateForm(form, formData);
    expect(form.opmetForm.value).toEqual(formData);
  });
});
