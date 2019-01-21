import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(tap(isLogged => {
      if (!isLogged) { this.auth.logout(); }
    }));
  }

}
