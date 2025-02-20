// table/no-results.spec.ts
// Martin Pravda

import {TestBed} from "@angular/core/testing";
import {NoResultsComponent} from "./no-results";

describe("NoResultComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoResultsComponent]
    }).compileComponents();
  });

  it("creates the no-result notification", () => {
    const fixture = TestBed.createComponent(NoResultsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("has proper text set", () => {
    const fixture = TestBed.createComponent(NoResultsComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("p")?.textContent).toBe(
      "No results have been found."
    );
  });
});
