import { AuthService } from './../auth/service/auth.service';
import { inject } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class authorizationGuard implements CanActivate {
  constructor(private AuthService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.AuthService.hasUser().pipe(
      tap((isLoged) => {
        if (!isLoged) {
          this.router.navigateByUrl('/login');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
