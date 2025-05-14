import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../Config';

@Injectable({
  providedIn: 'root'
})
export class GatekeeperService {
    token:any = '';
    userInfo:any;

  constructor(private http:HttpClient){}

  signup(payload:any){
    return this.http.post('http://localhost:3000/api/employeeSignup',payload);
  }

  login(payload:any){
    return this.http.post('http://localhost:3000/api/login',payload);
  }

  changePassword(payload:any){
    return this.http.post('http://localhost:3000/api/change-password',payload);

  }
  
  
}
