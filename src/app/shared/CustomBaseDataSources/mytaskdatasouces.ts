import { BaseDataSource } from "./basedatasources";
import { AuthServicesService } from "src/app/core/auth-services.service";

export class Mytaskdatasources extends BaseDataSource{

   constructor(private services:AuthServicesService){
       super();
   }

   mytraskdata(){
    const params={
        "From": 1,
        "To": 10,
        "Title": "",
        "UserId": 1248,
        "IsArchive": false,
        "UserIds": [],
        "Priority": "",
        "TaskStatus": "",
        "FromDueDate": "",
        "ToDueDate": "",
        "SortByDueDate": "",
        "SortColumn": "",
        "SortOrder": ""
      }
    this.services.assignymeANDarchievdlistANDmytask(params).subscribe((res)=>{
        console.log(res);

        this.allDataresponse.next(res.data.TaskList)
        
    })
   }

}