import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class reversedgaurdGuard implements CanActivate{
  constructor(private router: Router, private active: ActivatedRoute) { };

  canActivate() {
     const user =localStorage.getItem('access_token')

     if(user){
      return true;
     }else{
      this.router.navigate(['login'])
      return false;
     }
  }
  
}