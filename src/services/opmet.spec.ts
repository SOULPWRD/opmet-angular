import {TestBed} from "@angular/core/testing";
import {provideHttpClient} from "@angular/common/http";
import {
  provideHttpClientTesting,
  HttpTestingController
} from "@angular/common/http/testing";
import {rpcUrl} from "../config";
import {OpmetService} from "./opmet";

describe("ResultsComponent", () => {
  let http: HttpTestingController;
  let service: OpmetService;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), OpmetService]
    });

    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OpmetService);
  });

  afterEach(() => {
    http.verify();
  });

  it("fetches data successfully", () => {
    const mockPayload = {
      countries: ["SQ"],
      id: "id",
      reportTypes: ["METAR"],
      stations: ["LKPR EGLL"]
    };

    service.get(mockPayload);

    const req = http.expectOne({method: "POST", url: rpcUrl});
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual({
      id: "query-id",
      method: "query",
      params: [{...mockPayload, id: "briefing-id"}]
    });
  });
});
