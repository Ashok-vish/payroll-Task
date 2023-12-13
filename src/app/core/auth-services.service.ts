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

  assigntome(params:any):Observable<any>{
  return this.http.post<any>(`api/Task/UserTasksAssignedToMe`,params)
  }

  ownercc(params:any):Observable<any>{
    return this.http.post<any>(`api/Task/OwnerTasks`,params)
  }

  assignymeANDarchievdlistANDmytask(params:any):Observable<any>{
    return this.http.post<any>(`api/Task/UserTasksAssignedByMe`,params)
  }

  // archievd, delete, complete ect all 7 button api
  archive(params:any):Observable<any>{
    return this.http.post<any>(`api/Task/Archive`, params);
  }

  viewtaskcoverage(id:number, params:any):Observable<any>{
    return this.http.get<any>(`api/Task/StatusReport?taskId=${id}`,params)
  } 

  deleteoption(id:number,params:any):Observable<any>{
    return this.http.get<any>(`api/Task/DeleteTask?taskId=${id}`,params)
  }

  complete(params:any):Observable<any>{
    return this.http.post<any>(`api/Task/UpdateTaskStatus`,params)
  }

  unarchived(params:any):Observable<any>{
    return this.http.post<any>(`api/Task/Archive`, params)
  }

  particialComplete():Observable<any>{
    return this.http.get<any>(`api/Task/UserTaskStatusMaster`)
  }

  // viewtaskkdetails api

  userdetailstask(id:any):Observable<any>{
  return this.http.get<any>(`api/Task/UserTaskDetails?taskId=`+ id)
  }

}
