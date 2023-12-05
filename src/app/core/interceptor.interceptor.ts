import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router  , private toastr:ToastrService) {}
  access_token=localStorage.getItem('access_token')

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${this.access_token}`
        }
      })
    }
    return next.handle(request).pipe(tap
      (event => {
        if (event instanceof HttpResponse) {
          if (event.body == 401) {
            this.router.navigate(['/login'])
          }
        }
      }, (err) => {
        console.log("something went wrong")
        this.toastr.error(err.error.message)
      }
      )
    )
  };
  
}
