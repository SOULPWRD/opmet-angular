// services/opmet.ts
// Martin Pravda

// Opmet service uses an observable for observing new data coming from the JSON-RPC call
// It is used for notifying the result component and updating it accordingly

import type {Payload, Response, Param} from "./types";

import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {rpcUrl} from "../config";

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
    return this.http.post(rpcUrl, payload).subscribe((response) => {
      this.opmet.next(response as Response);
    });
  }
}
