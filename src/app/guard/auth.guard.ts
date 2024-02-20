import { Injectable, inject } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router)

  canActivateChild() {
   return this.authService.currentUser$.pipe(map(user => {
    if (user) {
      return true
    } else {
      this.router.navigate(['login'])
      return false;
    }
   }));
  }

}
