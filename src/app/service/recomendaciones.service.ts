import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {

  private apiUrl = environment.serverUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) { }

  getRecommendation(session_id:string):Observable<any>{
    let params = new HttpParams().set('session_id', session_id)
    return this.http.get(`${this.apiUrl}final_recommendations`, {params})
  }
}
