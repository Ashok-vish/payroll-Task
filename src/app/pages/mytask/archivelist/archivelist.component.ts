import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { Mytaskdatasources } from 'src/app/shared/CustomBaseDataSources/mytaskdatasouces';
import { MatDialog } from '@angular/material/dialog';
import { UnarchivedtaskComponent } from 'src/app/shared/unarchivedtask/unarchivedtask.component';
import { MatPaginator } from '@angular/material/paginator';
import { ViewTaskdetailsComponent } from 'src/app/shared/view-taskdetails/view-taskdetails.component';
import { merge, tap } from 'rxjs';


@Component({
  selector: 'app-archivelist',
  templateUrl: './archivelist.component.html',
  styleUrls: ['./archivelist.component.scss']
})
export class ArchivelistComponent implements OnInit , OnChanges , AfterViewInit{
  

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @Input() searchfeildtext!:any;
  @Input() currentTabindex!:any;

  datasources!: Mytaskdatasources;
  tableheadredef = [
    'Title',
    'CustomerName',
    'AssignedBy',
    'AssignedDate',
    'DueDate',
    'Priority',
    'Status',
    'Action'
  ]

  debouncetime:any


  constructor(public services: AuthServicesService , private dialog:MatDialog) { }
  ngOnChanges(changes: SimpleChanges) {
    this.datasources = new Mytaskdatasources(this.services)
    
    if(this.currentTabindex==3){
      if (this.debouncetime) {
        clearTimeout(this.debouncetime)
      }
      this.debouncetime = setTimeout(() => { this.archivedlist() }, 1000)
    }
  }

  ngOnInit() {
    // console.log(this.searchfeildtext)
  
  }

  ngAfterViewInit() {
    merge(this.paginator.page).pipe(tap(() => {
      this.archivedlist()
    })).subscribe()
  }


  viewdetails(lesson:any){
    
    const viewdetails=this.dialog.open(ViewTaskdetailsComponent,{
      height: '500px',
      width: '1000px',
      disableClose: true,
      data:lesson
    })
  }


  archivedlist(){

    if (this.paginator.pageIndex < 0 || this.paginator.pageIndex > (this.paginator.length / this.paginator.pageSize)) {
      return
    } 

    const params = {
      "From": 1,
      "To": 10,
      "Title": "",
      "UserId": 1315,
      "IsArchive": true,
      "UserIds": []
    }

    params.From = this.paginator.pageIndex * this.paginator.pageSize + 1
    params.To = (this.paginator.pageIndex + 1) * this.paginator.pageSize
    params.Title = this.searchfeildtext
    
    this.datasources.mytraskdata(params)
  }


  Unarchive(lesson:any){
   const unarchive= this.dialog.open(UnarchivedtaskComponent,{
      height: '200px',
      width: '400px',
      disableClose: true,
      data: lesson.TaskId
    })

    unarchive.afterClosed().subscribe((res:any)=>{
      if(res=='true'){
        this.archivedlist()
      }
    })

  }

}
