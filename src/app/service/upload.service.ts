import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = environment.serverUrl;
  private session_id :string ="";


  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };


  constructor(private http: HttpClient) { }

  procesar(selectedFiles: File[], session_id: string): Observable<any> {
    console.log(this.apiUrl)
    const formData = new FormData();
    selectedFiles.forEach(file => formData.append('files', file));
    formData.append('session_id', session_id);
    return this.http.post(`${this.apiUrl}upload_csv`, formData);
  }

  get getSession_id(): string {
    return this.session_id;
  }

  set setSession_id(value: string) {
    this.session_id = value;
  }

}
