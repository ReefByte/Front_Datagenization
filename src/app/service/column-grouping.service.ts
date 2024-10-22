import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColumnGroupingService {
  private apiUrl = environment.serverUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getColumns(session_id: string): Observable<any> {
    let params = new HttpParams().set('session_id', session_id);
    return this.http.get(`${this.apiUrl}read_csv`, { params });
  }

  getRecomendations(session_id: string): Observable<any> {
    let params = new HttpParams().set('session_id', session_id);
    return this.http.get(`${this.apiUrl}read_csv`, { params });
  }
  sendGrouping(data: any, session_id: string): Observable<any> {
    if (!session_id) {
      console.error('Session ID no proporcionado');
      return throwError(() => new Error('Session ID no está disponible'));
    }

    const params = new HttpParams().set('session_id', session_id);
    const url = `${this.apiUrl}homogenize`;

    return this.http.post(url, data, {
      params,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response',
    });
  }
}
