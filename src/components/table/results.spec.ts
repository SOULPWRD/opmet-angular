import {TestBed} from "@angular/core/testing";
import {provideHttpClient} from "@angular/common/http";
import {
  provideHttpClientTesting,
  HttpTestingController
} from "@angular/common/http/testing";
import {ResultsComponent} from "./results";
import {rpcUrl} from "../../config";
import {OpmetService} from "../../services/opmet";

const mockPayload = {
  countries: ["SQ"],
  id: "id",
  reportTypes: ["METAR"],
  stations: ["LKPR EGLL"]
};

describe("ResultsComponent", () => {
  let http: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), OpmetService]
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it("creates the results component", () => {
    const fixture = TestBed.createComponent(ResultsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("renders table", () => {
    const fixture = TestBed.createComponent(ResultsComponent);
    fixture.detectChanges();
    const service = TestBed.inject(OpmetService);
    service.get(mockPayload);
    const req = http.expectOne({method: "POST", url: rpcUrl});

    const mockResponse = {
      error: null,
      id: "query-2b66d8d8-5a1d-4117-ac70-606a2bc45757",
      result: [
        {
          placeId: "icao:EGLL",
          queryType: "METAR",
          receptionTime: "2025-02-20T13:25:09.623Z",
          refs: ["briefing-2b66d8d8-5a1d-4117-ac70-606a2bc45757"],
          reportTime: "2025-02-20T13:20:00Z",
          reportType: "MSG_METAR",
          stationId: "EGLL",
          text: "EGLL 201320Z AUTO 20014KT 9999 OVC009 12/11 Q1013=",
          textHTML:
            'EGLL 201320Z AUTO 20014KT 9999 <font color="green">OVC009</font> 12/11 Q1013='
        },
        {
          placeId: "icao:LZIB",
          queryType: "TAF_LONGTAF",
          receptionTime: "2025-02-20T11:10:44.578Z",
          refs: ["briefing-2b66d8d8-5a1d-4117-ac70-606a2bc45757"],
          reportTime: "2025-02-20T11:15:00Z",
          reportType: "MSG_LONGTAF",
          stationId: "LZIB",
          text: "LZIB 201115Z 2012/2112 14013KT CAVOK\r\r\n      BECMG 2020/2022 04005KT\r\r\n      BECMG 2107/2109 13012KT=",
          textHTML:
            'LZIB 201115Z 2012/2112 14013KT <font color="blue">CAVOK</font><br/>\n      BECMG 2020/2022 04005KT<br/>\n      BECMG 2107/2109 13012KT=',
          validFrom: "2025-02-20T12:00:00Z",
          validTo: "2025-02-21T12:00:00Z"
        }
      ]
    };

    req.flush(mockResponse);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const headers = compiled.querySelectorAll("th");
    const cells = compiled.querySelectorAll("tr > td");

    expect(headers[0]?.textContent).toBe("EGLL");
    expect(headers[1]?.textContent).toBe("LZIB");
    expect(cells).toHaveSize(6);
  });

  it("renders error", () => {
    const fixture = TestBed.createComponent(ResultsComponent);
    fixture.detectChanges();

    const service = TestBed.inject(OpmetService);
    service.get(mockPayload);
    const req = http.expectOne({method: "POST", url: rpcUrl});
    const mockResponse = {
      id: "query-id",
      error: {
        code: "1",
        message: "Error Message"
      },
      result: null
    };
    req.flush(mockResponse);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const paragraphs = compiled.querySelectorAll("p");

    expect(paragraphs[0]?.textContent).toContain("An error has occured.");
    expect(paragraphs[1]?.textContent).toContain(
      `Error code: ${mockResponse.error.code}`
    );
    expect(paragraphs[2]?.textContent).toContain(
      `Error message: ${mockResponse.error.message}`
    );
  });

  it("renders no results", () => {
    const fixture = TestBed.createComponent(ResultsComponent);
    fixture.detectChanges();

    const service = TestBed.inject(OpmetService);
    const mockResponse = {
      id: "query-id",
      error: null,
      result: []
    };
    service.get(mockPayload);
    const req = http.expectOne({method: "POST", url: rpcUrl});
    req.flush(mockResponse);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector("p")?.textContent).toBe(
      "No results have been found."
    );
  });
});
