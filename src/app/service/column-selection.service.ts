import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColumnSelectionService {

  private apiUrl = environment.serverUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) { }

  getColumns(session_id:string):Observable<any>{

    let params = new HttpParams().set('session_id', session_id)
    return this.http.get(`${this.apiUrl}read_csv`, {params})
  }

  getPreview(session_id:string, filename:string) : Observable<any> {
    let params = new HttpParams().set('session_id', session_id).set('filename', filename)
    return this.http.get(`${this.apiUrl}get_preview`, {params})
  }
}
