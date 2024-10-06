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

  getCsvColumnsAfter(sessionId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('session_id', sessionId);
    console.log(`${this.apiUrl}homogenize_test`);
    return this.http.get(`${this.apiUrl}homogenize_test`);
  }
}
