import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../Config';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { GatekeeperService } from './gatekeep.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private gateSrv: GatekeeperService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!navigator.onLine) {
      return false;
    }

    if (!this.gateSrv.token) {
      this.router.navigate(['login']);
      return false;
    }
    const allowedRoles = route.data['roles'] as Array<string> | undefined;
    const user = this.gateSrv.userInfo;

    if (allowedRoles && allowedRoles.length > 0) {
      const userRole = user?.ISSUPERADMIN ? 'admin' : user?.role;

      if (!userRole || !allowedRoles.includes(userRole)) {
        this.router.navigate(['login']); 
        return false;
      }
    }
    return true;
  }
}
