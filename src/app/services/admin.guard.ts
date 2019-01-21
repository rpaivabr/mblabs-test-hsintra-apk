import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.auth.isAdmin().pipe(tap(isAdmin => {
      if (!isAdmin) { this.auth.logout(); }
    }));
  }

}
