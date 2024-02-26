import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {


  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router)

  canActivate() {
   return this.authService.currentUserObservable$.pipe(map(user => {
    if (user) {
      this.router.navigate(['authenticated', 'home'])
      return false
    } else {
      return true;
    }
   }));
  }

}
