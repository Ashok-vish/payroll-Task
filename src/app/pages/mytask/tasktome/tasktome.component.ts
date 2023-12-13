import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { Mytaskdatasources } from 'src/app/shared/CustomBaseDataSources/mytaskdatasouces';
import { MatDialog } from '@angular/material/dialog';
import { ArchivetaskComponent } from 'src/app/shared/archivetask/archivetask.component';
import { TaskcoverageComponent } from 'src/app/shared/taskcoverage/taskcoverage.component';
import { DeletetaskComponent } from 'src/app/shared/deletetask/deletetask.component';
import { CompletetaskComponent } from 'src/app/shared/completetask/completetask.component';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, debounce, merge, tap } from 'rxjs';
import { MytaskComponent } from '../mytask.component';
import { ViewTaskdetailsComponent } from 'src/app/shared/view-taskdetails/view-taskdetails.component';
import { PartialcompleteComponent } from 'src/app/shared/partialcomplete/partialcomplete.component';


@Component({
  selector: 'app-tasktome',
  templateUrl: './tasktome.component.html',
  styleUrls: ['./tasktome.component.scss']
})
export class TasktomeComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @Input() searchfeildtext!: any
  @Input() currentTabindex!: any

  tableheadredef = ['Title', 'CustomerName', 'AssignedBy', 'AssignedDate', 'DueDate', 'Priority', 'Status', 'Action']

  SortOrder: any
  SortColumn: any
  togglevalue: boolean = false;
  datasource!: Mytaskdatasources
  UserID: any;
  debouncetime:any
     params = {
      "From": 1,
      "To": 5,
      "Title": "",
      "UserId": 1248,
      "IsArchive": false,
      "UserIds": [],
      "Priority": "",
      "TaskStatus": "",
      "FromDueDate": "",
      "ToDueDate": "",
      "SortByDueDate": "",
      "SortColumn": "",
      "SortOrder": ""
    }




  constructor(public services: AuthServicesService, private dialog: MatDialog, private toastr: ToastrService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.searchfeildtext);
    console.log(this.currentTabindex)

    // debugger

    if (this.currentTabindex == 0  && changes['searchfeildtext'])   {
      // console.log(changes['searchfeildtext'])
      // this.mytaskpage()
      if(this.debouncetime){
           clearTimeout(this.debouncetime)
      }
      this.debouncetime=setTimeout(() => { this.mytaskpage() }, 1000)
      
      // setTimeout(() => { this.mytaskpage() }, 1000)
    }

  }

  ngAfterViewInit() {
    console.log(this.searchfeildtext);

    // this.oncallpaginators()
    merge(this.paginator.page).pipe(tap(() => {
      this.mytaskpage()
    })).subscribe()

  }


  // oncallpaginators() {
  //   console.log(this.paginator);
  // }

  ngOnInit() {
    // console.log(this.searchfeildtext)
    // console.log(this.currentTabindex)
    this.datasource = new Mytaskdatasources(this.services)
    this.UserID = localStorage.getItem("userId")
    // console.log(this.datasource)

    // this.datasource.assignbyme(params)


  }


  mytaskpage() {

    if (this.paginator.pageIndex < 0 || this.paginator.pageIndex > (this.paginator.length / this.paginator.pageSize)) {
      return
    }

 

    this.params.From = this.paginator.pageIndex * this.paginator.pageSize + 1
    this.params.To = (this.paginator.pageIndex + 1) * this.paginator.pageSize
    this.params.Title = this.searchfeildtext
    if (this.SortOrder) {
      this.params.SortOrder = this.SortOrder
      this.params.SortColumn = this.SortColumn
    }

    this.datasource.assignbyme(this.params)


  }

  // assign
  //duedate



  toggletosort(assign: any, duedate: any) {

    if (assign == 'AssignedDate' && duedate == '') {

      console.log(event)
      this.togglevalue = !this.togglevalue
      if (this.togglevalue == true) {
        this.SortOrder = 'asc'
        this.SortColumn = 'CreateDate'
        this.mytaskpage()
      } else if (this.togglevalue == false) {
        this.SortOrder = 'desc'
        this.SortColumn = 'CreateDate'
        this.mytaskpage()
      }
      console.log(this.togglevalue);
    } else if (assign == '' && duedate == 'DueDate') {

      this.togglevalue = !this.togglevalue
      if (this.togglevalue == true) {
        this.SortOrder = 'asc'
        this.SortColumn = 'DueDate'
        this.mytaskpage()
      } else if (this.togglevalue == false) {
        this.SortOrder = 'desc'
        this.SortColumn = 'DueDate'
        this.mytaskpage()
      }
      console.log(this.togglevalue);

    }
  }

  viewdetails(lesson:any){
    
    const viewdetails=this.dialog.open(ViewTaskdetailsComponent,{
      height: '500px',
      width: '1000px',
      disableClose: true,
      data:lesson
    })
  }

  archievd(archievd: any) {
    console.log(archievd)
   const archi= this.dialog.open(ArchivetaskComponent, {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: archievd.TaskId
    })

    archi.afterClosed().subscribe((res)=>{
      if(res=='true'){
        this.mytaskpage()
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

    delet.afterClosed().subscribe((res)=>{
      if(res=='true'){
        this.mytaskpage()
      }
    })
  }

  completetask(lesson: any) {
    const complete = this.dialog.open(CompletetaskComponent, {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: lesson.TaskId
    })

    complete.afterClosed().subscribe((res)=>{
      if(res=='true'){
        this.mytaskpage()
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
        this.mytaskpage()
      } else {
        this.toastr.show(res.message)
      }
    }, (err) => {
      this.toastr.error(err.error.message)
    })
  }

  partiacomplete(lesson: any){
    const particalcomplete= this.dialog.open(PartialcompleteComponent,{
      height: '200px',
      width: '400px',
      disableClose: true,
      data: lesson.TaskId

    })

    particalcomplete.afterClosed().subscribe((res)=>{
      if(res=='true'){
        this.mytaskpage()
      }
    })
  }


}
