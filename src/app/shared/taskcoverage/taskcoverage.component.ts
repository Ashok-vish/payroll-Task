import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthServicesService } from 'src/app/core/auth-services.service';


@Component({
  selector: 'app-taskcoverage',
  templateUrl: './taskcoverage.component.html',
  styleUrls: ['./taskcoverage.component.scss']
})
export class TaskcoverageComponent implements OnInit {

  id:any
  viewCoveragedata:any

  constructor(private dialoref: MatDialogRef<TaskcoverageComponent> , private services:AuthServicesService , 
    @Inject(MAT_DIALOG_DATA) public data: any) { this.id=data}

  ngOnInit() {
    this.id
    console.log(this.id);
    this.taskdetails()
  }

  taskdetails(){

    const params = {
      taskId:this.id
    }
    this.services.viewtaskcoverage(this.id, params).subscribe((res)=>{
      this.viewCoveragedata=res.data
      console.log(this.viewCoveragedata)
    })
  }




  cancel(){
    this.dialoref.close()
  }

}
