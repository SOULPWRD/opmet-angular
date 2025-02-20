// table/error.spec.ts
// Martin Pravda

import {TestBed} from "@angular/core/testing";
import {ErrorComponent} from "./error";

describe("ErrorComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent]
    }).compileComponents();
  });

  it("creates the error", () => {
    const fixture = TestBed.createComponent(ErrorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("has the error code and message set", () => {
    const fixture = TestBed.createComponent(ErrorComponent);
    const app = fixture.componentInstance;
    app.code = "111";
    app.message = "Error message";
    fixture.detectChanges();
    expect(app.code).toEqual("111");
    expect(app.message).toEqual("Error message");
  });
});
