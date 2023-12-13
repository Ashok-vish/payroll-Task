import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from 'src/app/core/auth-services.service';

@Component({
  selector: 'app-partialcomplete',
  templateUrl: './partialcomplete.component.html',
  styleUrls: ['./partialcomplete.component.scss']
})
export class PartialcompleteComponent {

  mytaskdata: any
  message: boolean = false

  constructor(private dialogref: MatDialogRef<PartialcompleteComponent>, private service: AuthServicesService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.mytaskdata = data }

  partialdata:any

  ngOnInit(){
    this.add()
  }

  closed() {
    this.dialogref.close()
  }

  add() {
    const params = {
      TaskId: this.mytaskdata,
      TaskStatusValue:'100'

    }
    this.service.particialComplete().subscribe((res) => {
      console.log(res)
      this.partialdata=res.data

      if (res.Status == 200) {
        // this.message = true
        // this.toastr.success("Task Completed ")
        this.dialogref.close('true')
      } else {
        this.toastr.show(res.message)
      }
    }, (err) => {
      this.toastr.error(err.error.Message)
    })
  }


}
