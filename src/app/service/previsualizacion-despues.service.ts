import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PrevisualizacionDespuesService {
  constructor(private http: HttpClient) {}
  private apiUrl = environment.serverUrl;

  getCsvColumnsAfter(session_id: string): Observable<any> {
    let params = new HttpParams().set('session_id', session_id);
    return this.http.get(`${this.apiUrl}preview_csv`,{params});
  }
}
