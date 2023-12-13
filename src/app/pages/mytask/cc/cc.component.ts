import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Mytaskdatasources } from 'src/app/shared/CustomBaseDataSources/mytaskdatasouces';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ArchivetaskComponent } from 'src/app/shared/archivetask/archivetask.component';
import { ToastrService } from 'ngx-toastr';
import { TaskcoverageComponent } from 'src/app/shared/taskcoverage/taskcoverage.component';
import { DeletetaskComponent } from 'src/app/shared/deletetask/deletetask.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewTaskdetailsComponent } from 'src/app/shared/view-taskdetails/view-taskdetails.component';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.scss']
})
export class CcComponent implements OnInit, OnChanges , AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @Input() searchfeildtext!: any;
  @Input() currentTabindex!: any;

  tableheadredef = ['Title',
    'CustomerName',
    'AssignedBy',
    'AssignedDate',
    'DueDate',
    'Priority',
    'Status',
    'Action']
  datasource!: Mytaskdatasources;
  UserID: any = '';
  debouncetime: any

  constructor(public services: AuthServicesService, private dialog: MatDialog, private toastr: ToastrService) { }

  
  ngAfterViewInit() {
    merge(this.paginator.page).pipe(tap(() => {
      this.cctask()
    })).subscribe()
  }

  ngOnChanges(changes: SimpleChanges) {


    console.log(this.currentTabindex)
    if (this.currentTabindex == 1 && changes['searchfeildtext']) {
      if (this.debouncetime) {
        clearTimeout(this.debouncetime)
      }
      this.debouncetime = setTimeout(() => { this.cctask() }, 1000)

    }

    if(changes['currentTabindex']  && changes['currentTabindex'].currentValue==1){
      this.ngOnInit()
    }
  }

  viewdetails(lesson: any) {

    const viewdetails = this.dialog.open(ViewTaskdetailsComponent, {
      height: '500px',
      width: '1000px',
      disableClose: true,
      data: lesson
    })
  }


  cctask() {
    if (this.paginator.pageIndex < 0 || this.paginator.pageIndex > (this.paginator.length / this.paginator.pageSize)) {
      return
    }
    const params = {
      "From": 1,
      "To": 5,
      "Title": "",
      "UserId": 1315,
      "IsArchive": "",
      "UserIds": [""],
      "TaskStatus": "",
      "Priority": ""
    }

    params.From = this.paginator.pageIndex * this.paginator.pageSize + 1
    params.To = (this.paginator.pageIndex + 1) * this.paginator.pageSize
    params.Title = this.searchfeildtext

    this.datasource.owner(params)
    // console.log(this.datasource)
  }

  ngOnInit() {

    this.datasource = new Mytaskdatasources(this.services)

    // debugger
    console.log(this.searchfeildtext);



    this.UserID = localStorage.getItem("userId")

    if (this.currentTabindex == 1) {
      // debugger
      const params = {
        "From": 1,
        "To": 5,
        "Title": "",
        "UserId": 1315,
        "IsArchive": "",
        "UserIds": [""],
        "TaskStatus": "",
        "Priority": ""
      }

      this.datasource.owner(params)

    }

  }






  archievd(archievd: any) {
    console.log(archievd)
    const archived = this.dialog.open(ArchivetaskComponent, {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: archievd.TaskId
    })

    archievd.afterClosed().subscribe((res: any) => {
      if (res == 'true') {
        this.cctask()
      }
    })
  }


  accept(lesson: any) {
    const params = {
      TaskId: lesson.TaskId,
      TaskStatusValue: '0'

    }
    this.services.complete(params).subscribe((res: any) => {
      if (res.Status == 200) {
        this.toastr.success('Task Completed')
        this.cctask()
      } else {
        this.toastr.show(res.message)
      }
    }, (err) => {
      this.toastr.error(err.error.message)
    })
  }

  viewtaskcoverage(lesson: any) {
    this.dialog.open(TaskcoverageComponent, {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: lesson.TaskId
    })
  }

  deleteoption(lesson: any) {
    const del = this.dialog.open(DeletetaskComponent, {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: lesson.TaskId
    })

    del.afterClosed().subscribe((res: any) => {
      if (res == 'true') {
        this.cctask()
      }
    })
  }



}
