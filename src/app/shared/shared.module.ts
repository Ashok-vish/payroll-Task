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


const component = [HeaderComponent,
  AddTaskassigntootherComponent,
  AdduserComponent,
  AddccmembersComponent

]

@NgModule({
  declarations: [
    ...component,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    FormsModule,

  ],
  exports: [...component],
  providers:[AuthServicesService]
})
export class SharedModule { }

