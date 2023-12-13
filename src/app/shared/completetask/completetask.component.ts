import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { ToastrService } from 'ngx-toastr';
import { ArchivetaskComponent } from '../archivetask/archivetask.component';

@Component({
  selector: 'app-completetask',
  templateUrl: './completetask.component.html',
  styleUrls: ['./completetask.component.scss']
})
export class CompletetaskComponent implements OnInit {

  mytaskdata: any
  message: boolean = false

  constructor(private dialogref: MatDialogRef<ArchivetaskComponent>, private service: AuthServicesService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.mytaskdata = data }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  closed() {
    this.dialogref.close()
  }

  add() {
    const params = {
      TaskId: this.mytaskdata,
      TaskStatusValue:'100'

    }
    this.service.complete(params).subscribe((res) => {
      if (res.Status == 200) {
        this.message = true
        this.toastr.success("Task Completed ")
        this.dialogref.close('true')
      } else {
        this.toastr.show(res.message)
      }
    }, (err) => {
      this.toastr.error(err.error.Message)
    })
  }

}
