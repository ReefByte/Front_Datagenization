import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PrevisualizacionAntesService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.serverUrl;

  getCsvColumns(filenames: string[], sessionId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('session_id', sessionId);
    filenames.forEach((filename) => {
      params = params.append('filenames', filename);
    });
    console.log(`${this.apiUrl}read_csv`)
    return this.http.get(`${this.apiUrl}read_csv`   );
  }
}
