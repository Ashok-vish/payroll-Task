import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material/material.module';
import { AddTaskassigntootherComponent } from './add-taskassigntoother/add-taskassigntoother.component';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdduserComponent } from './adduser/adduser.component';
import { AddccmembersComponent } from './addccmembers/addccmembers.component';

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
    // FormGroup,
    ReactiveFormsModule
  ],
  exports: [...component]
})
export class SharedModule { }

