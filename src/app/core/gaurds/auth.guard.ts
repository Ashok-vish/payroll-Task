import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})

export class authGuard implements CanActivate{
  constructor(private router: Router, private active: ActivatedRoute) { };

  canActivate() {
    // debugger
     const user =localStorage.getItem('access_token')

     if(user){
      return true;
     }else{
      this.router.navigate([''])
      return false;
     }
  }
}
