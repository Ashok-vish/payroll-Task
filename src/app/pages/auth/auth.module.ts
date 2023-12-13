import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { AuthServicesService } from 'src/app/core/auth-services.service';
// import { ToastrModule } from 'ngx-toastr';
import { NgHttpLoaderModule } from 'ng-http-loader'





const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }

]


@NgModule({
  declarations: [
    LoginComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    NgHttpLoaderModule,
    RouterModule.forChild(routes),
  ],

  providers: [
    AuthServicesService,
  ]

})
export class AuthModule { }
