import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { ToastrService } from 'ngx-toastr';
import { ArchivetaskComponent } from '../archivetask/archivetask.component';


@Component({
  selector: 'app-deletetask',
  templateUrl: './deletetask.component.html',
  styleUrls: ['./deletetask.component.scss']
})
export class DeletetaskComponent  implements OnInit {

  mytaskdata: any
  message: boolean = false

  constructor(private dialogref: MatDialogRef<ArchivetaskComponent>, private service: AuthServicesService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.mytaskdata = data }


  ngOnInit() {
  }

  closed() {
    this.dialogref.close()
  }

  add() {
    const params = {
      TaskId: this.mytaskdata

    }
    this.service.deleteoption(this.mytaskdata,params).subscribe((res)=>{
      if(res.Status==200){
        this.message=true
        this.toastr.success("Task Deleted")
        this.dialogref.close('true')
      }else{
        this.toastr.show(res.message)
      }
    },(err)=>{
      err.error.Message
    })
  }
}
