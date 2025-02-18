import type {Payload, Response, Param} from "./types";

import {inject, Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {config} from "../config";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class OpmetService {
  private http = inject(HttpClient);
  private opmet = new Subject<Response>();
  data$ = this.opmet.asObservable();

  get(data: Param) {
    const payload: Payload = {
      id: `query-${data.id}`,
      method: "query",
      params: [
        {
          ...data,
          id: `briefing-${data.id}`
        }
      ]
    };
    return this.http.post(config.url, payload).subscribe((response) => {
      this.opmet.next(response as Response);
    });
  }
}
