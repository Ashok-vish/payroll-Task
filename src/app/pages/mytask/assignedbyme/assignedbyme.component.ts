import { InputModalityDetector } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Mytaskdatasources } from 'src/app/shared/CustomBaseDataSources/mytaskdatasouces';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ArchivetaskComponent } from 'src/app/shared/archivetask/archivetask.component';
import { TaskcoverageComponent } from 'src/app/shared/taskcoverage/taskcoverage.component';
import { DeletetaskComponent } from 'src/app/shared/deletetask/deletetask.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewTaskdetailsComponent } from 'src/app/shared/view-taskdetails/view-taskdetails.component';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-assignedbyme',
  templateUrl: './assignedbyme.component.html',
  styleUrls: ['./assignedbyme.component.scss']
})
export class AssignedbymeComponent implements OnInit , OnChanges , AfterViewInit {

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
  datasources!: Mytaskdatasources
  UserID: any;
  SortOrder: any
  SortColumn: any
  togglevalue: boolean = false;
  debouncetime:any;



  constructor(public services: AuthServicesService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.datasources = new Mytaskdatasources(this.services)

    // console.log(this.datasources)

    if(this.currentTabindex==2  &&  changes['searchfeildtext']){

      // this.assigntask()
      if(this.debouncetime){
        clearTimeout(this.debouncetime)
      }
      this.debouncetime=setTimeout(()=>{this.assigntask()},1000)
    }

    if(changes['currentTabindex'] && changes['currentTabindex'].currentValue==2){
      this.ngOnInit()
    }

  }

  ngOnInit() {
    // console.log(this.searchfeildtext);
    this.UserID = localStorage.getItem("userId")

    if(this.currentTabindex ==2){
      const params = {
        "From": 1,
        "To": 5,
        "Title": "",
        "UserId": '',
        "IsArchive": false,
        "UserIds": [""],
        "Priority": "",
        "TaskStatus": "",
        "FromDueDate": "",
        "ToDueDate": "",
        "SortByDueDate": "",
        "SortColumn":"",
        "SortOrder":"",
        
  
      }
      
      this.datasources.mytraskdata(params)
    }
  }

  ngAfterViewInit() {
    merge(this.paginator.page).pipe(tap(() => {
      this.assigntask()
    })).subscribe()
  }

  assigntask(){

    // debugger

    if (this.paginator.pageIndex < 0 || this.paginator.pageIndex > (this.paginator.length / this.paginator.pageSize)) {
      return
    } 

    const params = {
      "From": 1,
      "To": 5,
      "Title": "",
      "UserId": '',
      "IsArchive": false,
      "UserIds": [""],
      "Priority": "",
      "TaskStatus": "",
      "FromDueDate": "",
      "ToDueDate": "",
      "SortByDueDate": "",
      "SortColumn":"",
      "SortOrder":"",
      

    }

    params.From = this.paginator.pageIndex * this.paginator.pageSize + 1
    params.To = (this.paginator.pageIndex + 1) * this.paginator.pageSize
    params.Title = this.searchfeildtext;
    if (this.SortOrder) {
      params.SortOrder = this.SortOrder
      params.SortColumn = this.SortColumn
    }

    
    
    this.datasources.mytraskdata(params)
  }

  viewdetails(lesson:any){
    
    const viewdetails=this.dialog.open(ViewTaskdetailsComponent,{
      height: '500px',
      width: '1000px',
      disableClose: true,
      data:lesson
    })
  }



  toggletosort(assign: any, duedate: any) {

    if (assign == 'AssignedDate' && duedate == '') {

      console.log(event)
      this.togglevalue = !this.togglevalue
      if (this.togglevalue == true) {
        this.SortOrder = 'asc'
        this.SortColumn = 'CreateDate'
        this.assigntask()
      } else if (this.togglevalue == false) {
        this.SortOrder = 'desc'
        this.SortColumn = 'CreateDate'
        this.assigntask()
      }
      console.log(this.togglevalue);
    } else if (assign == '' && duedate == 'DueDate') {

      this.togglevalue = !this.togglevalue
      if (this.togglevalue == true) {
        this.SortOrder = 'asc'
        this.SortColumn = 'DueDate'
        this.assigntask()
      } else if (this.togglevalue == false) {
        this.SortOrder = 'desc'
        this.SortColumn = 'DueDate'
        this.assigntask()
      }
      console.log(this.togglevalue);

    }




  }


  archievd(archievd: any) {
    console.log(archievd)
   const arch= this.dialog.open(ArchivetaskComponent, {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: archievd.TaskId
    })

    arch.afterClosed().subscribe((res:any)=>{
      if(res=='true'){
        this.assigntask()
      }
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
    const delet= this.dialog.open(DeletetaskComponent, {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: lesson.TaskId
    })

    delet.afterClosed().subscribe((res:any)=>{
      if(res=='ture'){
        this.assigntask()
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
        this.assigntask()
      } else {
        this.toastr.show(res.message)
      }
    }, (err) => {
      this.toastr.error(err.error.message)
    })
  }


}
