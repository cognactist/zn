import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, from } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { UserService} from '../services/user.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
 
    return this.checkLogin();
  }
  checkLogin(): boolean {

    console.log(this.userService.isLoggedIn)
  
    if (localStorage.getItem("token")) { 
      return true; 
    }else{
      this.router.navigate(['/login']);
      return false;
    }

    // Store the attempted URL for redirecting
    //this.userService.redirectUrl = url;

    // Navigate to the login page with extras
 
  }
  
}
