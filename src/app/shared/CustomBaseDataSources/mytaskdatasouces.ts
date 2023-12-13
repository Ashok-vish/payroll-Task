import { BaseDataSource } from "./basedatasources";
import { AuthServicesService } from "src/app/core/auth-services.service";

export class Mytaskdatasources extends BaseDataSource{

   constructor(private services:AuthServicesService){
       super();
   }

   mytraskdata(params:any){
    this.services.assignymeANDarchievdlistANDmytask(params).subscribe((res)=>{
        // console.log(res);

        this.allDataresponse.next(res.data.TaskList)
        this.totalPaginationcount.next(res.data.TotalCount)
        
    })
   }

   assignbyme(params:any){
    this.services.assigntome(params).subscribe(res=>{
        this.allDataresponse.next(res.data.TaskList) 
        this.totalPaginationcount.next(res.data.TotalCount)
    })
   }


   owner(params:any){

    this.services.ownercc(params).subscribe((res:any)=>{
    this.allDataresponse.next(res.data.TaskList) 
    this.totalPaginationcount.next(res.data.TotalCount)
    // console.log(this.allDataresponse)
    // console.table(this.allDataresponse)
    
    })
   }



}