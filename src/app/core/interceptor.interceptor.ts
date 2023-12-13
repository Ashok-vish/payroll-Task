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
        // console.log("something went wrong")
        this.toastr.error('Something Went Wrong')
      }
      )
    )
  };

//   {
//     "Message": "An error has occurred.",
//     "ExceptionMessage": "Value cannot be null.\r\nParameter name: source",
//     "ExceptionType": "System.ArgumentNullException",
//     "StackTrace": "   at System.Linq.Enumerable.FirstOrDefault[TSource](IEnumerable`1 source)\r\n   at COG.API.AuthenticationHandler.<SendAsync>d__2.MoveNext()\r\n--- End of stack trace from previous location where exception was thrown ---\r\n   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n   at System.Web.Http.Owin.PassiveAuthenticationMessageHandler.<SendAsync>d__0.MoveNext()\r\n--- End of stack trace from previous location where exception was thrown ---\r\n   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()\r\n   at System.Runtime.CompilerServices.TaskAwaiter.HandleNonSuccessAndDebuggerNotification(Task task)\r\n   at System.Web.Http.HttpServer.<SendAsync>d__24.MoveNext()"
// }
  
}
