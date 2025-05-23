import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Config } from '../../Config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GatekeeperService {
  token: any = '';
  userInfo: any;
  private empFuncDataSubject = new BehaviorSubject<any>(null);
  empFuncData$ = this.empFuncDataSubject.asObservable();
  private performActionSubject = new BehaviorSubject<boolean>(false);
  performAction$ = this.performActionSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  setEmpFuncData(data: any) {
    this.empFuncDataSubject.next(data);
  }

  getEmpFuncData() {
    return this.empFuncDataSubject.getValue();
  }

  setPerformAction(data: any) {
    this.performActionSubject.next(data);
  }

  getPerformAction() {
    return this.performActionSubject.getValue();
  }

  signup(payload: any) {
    return this.http.post('http://localhost:3000/api/employeeSignup', payload, { withCredentials: true });
  }

  login(payload: any) {
    return this.http.post('http://localhost:3000/api/login', payload, { withCredentials: true });
  }

  changePassword(payload: any) {
    return this.http.post('http://localhost:3000/api/change-password', payload, { withCredentials: true });
  }

  changeProfile(payload: any) {
    return this.http.post('http://localhost:3000/api/change-profile', payload, { withCredentials: true });
  }

  getProfileData(payload: any) {
    return this.http.post('http://localhost:3000/api/get-profile', payload);
  }

  deleteAccount(payload: any) {
    return this.http.post('http://localhost:3000/api/delete-account', payload);
  }

  signOut() {
    return this.http.post('http://localhost:3000/api/sign-out', '');
  }

  addRole(payload: any) {
    return this.http.post('http://localhost:3000/api/addRole', payload);
  }

  getRole() {
    return this.http.get('http://localhost:3000/api/getRoles');
  }

  updateRole(id: any, payload: any) {
    return this.http.put('http://localhost:3000/api/editRole/' + id, payload);
  }

  deleteRole(name: any, email: any) {
    return this.http.delete('http://localhost:3000/api/deleteRole/' + name, {
      body: { email: email }
    });
  }

  getAllEmp() {
    return this.http.get('http://localhost:3000/api/getUserMgtEmp');
  }

  updateEmp(id: any, payload: any) {
    return this.http.put('http://localhost:3000/api/editUser/' + id, payload);
  }

  deleteEmp(id: any, email: any) {
    return this.http.delete('http://localhost:3000/api/deleteUser/' + id, {
      body: { email: email }
    });
  }

  updateEmpDet(id: any, ISUSERLOCKED: any) {
    let payload = { ISUSERLOCKED: ISUSERLOCKED }
    return this.http.post('http://localhost:3000/api/employees/' + id + '/status', payload);
  }

  getPermission() {
    return this.http.get('http://localhost:3000/api/permissionList');
  }

  submitRolePermissions(payload: any) {
    return this.http.post('http://localhost:3000/api/role-permission', payload);
  }

  getRolePermission(id: any) {
    return this.http.get('http://localhost:3000/api/role-permission/' + id);

  }

  handleSignOut(): void {
    this.signOut().subscribe({
      next: (response: any) => {
        if (response.status === 'Success') {
          this.userInfo = {};
          this.router.navigate(['/login']);
        } else {
          alert(response.message);
        }
      },
      error: () => {
        alert('An error occurred while signing out');
      }
    });
  }


}
