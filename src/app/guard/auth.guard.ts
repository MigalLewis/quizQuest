import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '../service/auth.service';
import {map, Observable} from 'rxjs';
import {user} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanActivate {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router)

  canActivate() {
   return this.authService.currentUserObservable$.pipe(map(user => {
    if (user) {
      return true
    } else {
      this.router.navigate(['login'])
      return false;
    }
   }));
  }

  canActivateChild() {
    return this.canActivate();
  }

}
