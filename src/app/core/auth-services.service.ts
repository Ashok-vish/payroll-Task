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

  addusers(from:number , text:string, to:number):Observable<any>{
    return this.http.get<any>(`api/CompanyMembers?from=${from}&text=${text}&to=${to}`)
  }

  addCC(from:number , text:string, to:number):Observable<any>{
    return this.http.get<any>(`api/CompanyMembers?from=${from}&text=${text}&to=${to}`)
  }

  assigntask(params:any):Observable<any>{
    return this.http.post<any>(`api/Task/AssignTask`,params)
  }


  // mytask pages for all option 

  // mytask(params:any):Observable<any>{
  // return this.http.post<any>(`api/Task/UserTasksAssignedToMe`,params)
  // }

  ownercc(params:any):Observable<any>{
    return this.http.post<any>(`api/Task/OwnerTasks`,params)
  }

  assignymeANDarchievdlistANDmytask(params:any):Observable<any>{
    return this.http.post<any>(`api/Task/UserTasksAssignedByMe`,params)
  }
}
