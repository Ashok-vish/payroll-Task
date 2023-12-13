import { Component, INJECTOR, Inject, OnInit, inject } from '@angular/core';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unarchivedtask',
  templateUrl: './unarchivedtask.component.html',
  styleUrls: ['./unarchivedtask.component.scss']
})
export class UnarchivedtaskComponent implements OnInit {

  message: boolean = false;
  id: any

  constructor(private service: AuthServicesService, private dialogref: MatDialogRef<UnarchivedtaskComponent>,private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.id = data }

  ngOnInit() {
    console.log(this.id)
  }


  closed() {
    this.dialogref.close()
  }


  add() {

    const params = {
      IsArchive: false,
      TaskId: this.id
    }

    this.service.unarchived(params).subscribe((res:any)=>{
      if(res.Status==200){
     this.toastr.success("Task Unarchive")
     this.dialogref.close('true')
      }else{
        this.toastr.show(res.messsage)
      }
    },(err)=>{this.toastr.error(err.error.message)})

  }

}
