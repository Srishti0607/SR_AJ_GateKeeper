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
  constructor(private router:Router,private gateSrv: GatekeeperService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!navigator.onLine) {
      return false;
    } else {
      if (this.gateSrv.token) {
        return true;
      }
      this.router.navigate(["login"]);
      return false;
    }
  }
  
  
}
