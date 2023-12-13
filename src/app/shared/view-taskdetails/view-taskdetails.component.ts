import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { ToastrService } from 'ngx-toastr';
import { ViewimagesComponent } from '../viewimages/viewimages.component';
import { TruncatepipesPipe } from 'src/app/core/pipes/truncatepipes.pipe';


@Component({
  selector: 'app-view-taskdetails',
  templateUrl: './view-taskdetails.component.html',
  styleUrls: ['./view-taskdetails.component.scss']
})

export class ViewTaskdetailsComponent implements OnInit {

  viewdetails: any
  imgUrl: any
  constructor(private dialogref: MatDialogRef<ViewTaskdetailsComponent>, private service: AuthServicesService, private dialog: MatDialog) {}

  ngOnInit() {
    this.service.userdetailstask(732).subscribe((res: any) => {
      console.log(res)
      this.viewdetails = res.data
      console.log(this.viewdetails)
    })
  }

  closed() {
    this.dialogref.close()
  }

  viewimages(viewdetailsimages: any) {
    this.dialog.open(ViewimagesComponent,{
      height:'200px',
      width:'400px',
      data:viewdetailsimages,
    })
  }

}


