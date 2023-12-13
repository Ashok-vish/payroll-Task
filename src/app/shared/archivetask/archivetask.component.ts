import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-archivetask',
  templateUrl: './archivetask.component.html',
  styleUrls: ['./archivetask.component.scss']
})
export class ArchivetaskComponent implements OnInit {

  mytaskdata: any
  message: boolean = false

  constructor(private dialogref: MatDialogRef<ArchivetaskComponent>, private service: AuthServicesService, private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.mytaskdata = data }


  ngOnInit() {
    console.log(this.mytaskdata)
  }


  add() {
    this.message = true
    const params = {
      IsArchive: true,
      TaskId: this.mytaskdata

    }
    this.service.archive(params).subscribe((res) => {
      console.log(res)
      if (res.Status == 200) {
        this.toastr.success("Task Add To Archive")
        this.dialogref.close("true")
      }else{
        this.toastr.show(res.message)
      }

    },(err)=>{err.error.message})
  }

  closed() {

    this.dialogref.close()
  }



}
