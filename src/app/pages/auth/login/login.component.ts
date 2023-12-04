import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServicesService } from 'src/app/core/auth-services.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup = this.fb.group({})
  email: string = ''
  password: string = ''

  constructor(private fb: FormBuilder, private authServices: AuthServicesService, private toastr: ToastrService , private router:Router) { }
  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required])],
    })
  }

  signin() {
    // debugger
    if (this.login.invalid) {
      this.login.markAllAsTouched()
      return
    } else {
      this.email = this.login.controls['email'].value
      this.password = this.login.controls['Password'].value

      // console.log(this.email + this.password)

      this.authServices.login(this.email, this.password).pipe(map((res: any) => {
        if (res.userDetail.Status==200) {
          console.log(res.userDetail.data)
          const userdata=res.userDetail.data
          console.log(res.userDetail)
          const accessToken = "Basic" + btoa(this.email + ":" + this.password)
          localStorage.setItem('access_token', accessToken)
          localStorage.setItem('userId', res.userId)
          this.toastr.success("Login Successfully")
          this.router.navigate(['/mytask'])
          
        }else{
          this.toastr.error(res.errormessage)
        }
      },(err:any)=>{
        this.toastr.error(err.error.errormessage)
      })).subscribe()


    }


    // this.authServices.login(this.login.)

  }







}
