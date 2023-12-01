import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';


const routes:Routes=[
  { path: '', loadChildren: () => import('../pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'mytask', loadChildren: () => import('../pages/mytask/mytask.module').then(m => m.MytaskModule) }  
]


@NgModule({
  declarations: [],
  
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    RouterModule.forChild(routes),
  
  ],
  exports: [RouterModule]
})
export class PagesModule { }
