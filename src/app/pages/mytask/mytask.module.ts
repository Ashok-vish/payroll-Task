import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material/material.module';
import { MytaskRoutingModule } from './mytask-routing.module';
import { MytaskComponent } from './mytask.component';
import { CcComponent } from './cc/cc.component';
import { AssignedbymeComponent } from './assignedbyme/assignedbyme.component';
import { ArchivelistComponent } from './archivelist/archivelist.component';
import { TasktomeComponent } from './tasktome/tasktome.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';


const routes:Routes=[
  {path:'cc', component:CcComponent},
  {path:'task', component:TasktomeComponent},
  {path:'archievelist', component:ArchivelistComponent},
  {path:'assignbtme',component:AssignedbymeComponent}
]


@NgModule({
  declarations: [
    MytaskComponent,
    CcComponent,
    AssignedbymeComponent,
    ArchivelistComponent,
    TasktomeComponent,
  ],
  imports: [
    CommonModule,
    MytaskRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class MytaskModule { }
