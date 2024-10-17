import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DescargarDatasetService {

  apiUrl=environment.serverUrl;

  constructor(private http: HttpClient) { }

  downloadCsv(session_id: string): Observable<Blob> {
    let params = new HttpParams().set('session_id', session_id)
    return this.http.get(`${this.apiUrl}download_csv`, { params: params, responseType: 'blob' });
  }

}
