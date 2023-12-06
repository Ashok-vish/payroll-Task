import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { Mytaskdatasources } from 'src/app/shared/CustomBaseDataSources/mytaskdatasouces';


@Component({
  selector: 'app-tasktome',
  templateUrl: './tasktome.component.html',
  styleUrls: ['./tasktome.component.scss']
})
export class TasktomeComponent implements OnInit {


  tableheadredef = ['Title',
    'CustomerName',
    'AssignedBy',
    'AssignedDate',
    'DueDate',
    'Priority',
    'Status',
  'Action']
    
  datasource!: Mytaskdatasources

  constructor(public services: AuthServicesService) { }

  ngOnInit() {

    this.datasource = new Mytaskdatasources(this.services)


    console.log(this.datasource)

    this.datasource.mytraskdata()
  }


}
