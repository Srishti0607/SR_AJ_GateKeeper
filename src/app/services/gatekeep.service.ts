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

  changeProfile(payload:any){
    return this.http.post('http://localhost:3000/api/change-profile',payload);
  }

  getProfileData(payload:any){
    return this.http.post('http://localhost:3000/api/get-profile',payload);
  }

  deleteAccount(payload:any){
    return this.http.post('http://localhost:3000/api/delete-account',payload);
  }

  signOut(){
    return this.http.post('http://localhost:3000/api/sign-out','');
  }

  addRole(payload:any){
    return this.http.post('http://localhost:3000/api/addRole',payload);
  }

  getRole(){
    return this.http.get('http://localhost:3000/api/getRoles');
  }

  updateRole(id:any,payload:any){
    return this.http.put('http://localhost:3000/api/editRole/'+id,payload);
  }
  
  
}
