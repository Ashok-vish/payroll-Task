import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material/material.module';
import { AddTaskassigntootherComponent } from './add-taskassigntoother/add-taskassigntoother.component';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AdduserComponent } from './adduser/adduser.component';
import { AddccmembersComponent } from './addccmembers/addccmembers.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ArchivetaskComponent } from './archivetask/archivetask.component';
import { TaskcoverageComponent } from './taskcoverage/taskcoverage.component';
import { DeletetaskComponent } from './deletetask/deletetask.component';
import { CompletetaskComponent } from './completetask/completetask.component';
import { PartialcompleteComponent } from './partialcomplete/partialcomplete.component';
import { UnarchivedtaskComponent } from './unarchivedtask/unarchivedtask.component';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ViewTaskdetailsComponent } from './view-taskdetails/view-taskdetails.component';
import { ViewimagesComponent } from './viewimages/viewimages.component';
import { CoreModule } from '../core/core.module';
import { ConfirmationdialogComponent } from './confirmationdialog/confirmationdialog.component';
import { MatDialogModule } from '@angular/material/dialog';


const component = [HeaderComponent,
  AddTaskassigntootherComponent,
  AdduserComponent,
  AddccmembersComponent

]

@NgModule({
  declarations: [
    ...component,
    ArchivetaskComponent,
    TaskcoverageComponent,
    DeletetaskComponent,
    CompletetaskComponent,
    PartialcompleteComponent,
    UnarchivedtaskComponent,
    ViewTaskdetailsComponent,
    ViewimagesComponent,
    ConfirmationdialogComponent,
    

  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    FormsModule,
    NgHttpLoaderModule,
    CoreModule,
    MatDialogModule,

  ],
  exports: [...component],
  providers:[AuthServicesService]
})
export class SharedModule { }

