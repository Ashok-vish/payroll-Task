import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  // private baseUrl = '/api'
  constructor(private http: HttpClient) { }


  login(username:string, password:string): Observable<any> {
    return this.http.post<any>(`api/account/authenticate`,{ username, password })
  }
}
