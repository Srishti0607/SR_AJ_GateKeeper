import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatekeeperService } from '../../services/gatekeep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  standalone: false
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword: boolean = false;
  roles: any;
  showRoleDropdown: boolean = false;
  mode: any = 'signup'
  view: boolean = false;




  constructor(private fb: FormBuilder, private gateSrv: GatekeeperService, private router: Router) { }

  ngOnInit() {
    this.initForm(undefined, false);
    this.showRoleDropdown = false;
    this.gateSrv.empFuncData$.subscribe(data => {
      if (data) {
        this.initForm(data?.editData, data.isView);
        if (data?.showRoleDropdown) {
          this.fetchRoles();
          this.showRoleDropdown = data?.showRoleDropdown;
          this.mode = data?.mode;
          this.view = data?.isView;
          this.signupForm.get('role')?.setValidators([Validators.required]);
          this.signupForm.get('role')?.updateValueAndValidity();
           this.signupForm.get('password')?.clearValidators();
          this.signupForm.get('password')?.updateValueAndValidity();
        } 
      }
    });
  }

  initForm(editData: any, isView: boolean) {
    this.signupForm = this.fb.group({
      firstName: [{ value: editData == undefined ? '' : editData.FIRSTNAME, disabled: isView }, Validators.required],
      lastName: [{ value: editData == undefined ? '' : editData.LASTNAME, disabled: isView }, Validators.required],
      email: [{ value: editData == undefined ? '' : editData.EMAIL, disabled: isView }, [Validators.required, Validators.email]],
      password: [{ value: editData == undefined ? '' : editData.PASSWORD, disabled: isView }, Validators.required],
      role: [{ value: editData == undefined ? '' : editData.USERROLE, disabled: isView }],
      id: [{ value: editData == undefined ? '' : editData?.ID, disabled: isView }]
    });
  }

  fetchRoles() {
    this.gateSrv.getRole().subscribe({
      next: (items) => this.roles = items,
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signupUser() {
    let payload = {
      'FIRSTNAME': this.signupForm.get('firstName')?.value,
      'LASTNAME': this.signupForm.get('lastName')?.value,
      'EMAIL': this.signupForm.get('email')?.value,
      'PASSWORD': this.signupForm.get('password')?.value == '' ? '12345' : this.signupForm.get('password')?.value,
      'mode': 'signup'
    }
    this.gateSrv.signup(payload).subscribe((res: any) => {
      if (res) {
        if (res.status == 'Success') {
          this.signupForm.reset();
          alert(res.message);
        } else {
          this.signupForm.reset();
          alert(res.message);
        }
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }


  addEmployeeDetails(mode: any) {
    console.log(this.signupForm)
    let payload = {
      'FIRSTNAME': this.signupForm.get('firstName')?.value,
      'LASTNAME': this.signupForm.get('lastName')?.value,
      'EMAIL': this.signupForm.get('email')?.value,
      'PASSWORD': this.signupForm.get('password')?.value == '' ? '12345' : this.signupForm.get('password')?.value,
      'ROLENAME': this.signupForm.get('role')?.value,
      'mode': mode,
      'email': this.gateSrv.userInfo.EMAIL
    }
    if (!this.view && this.signupForm.get('id')?.value == '') {
      this.gateSrv.signup(payload).subscribe((res: any) => {
        if (res) {
          if (res.status == 'Success') {
            this.gateSrv.setPerformAction(true);
            alert(res.message);
          }
        }
      });
    } else {
      this.gateSrv.updateEmp(this.signupForm.get('id')?.value, payload).subscribe((res: any) => {
        if (res) {
          if (res.status == 'Success') {
            this.gateSrv.setPerformAction(true);
            alert(res.message);
          }
        }
      });
    }
  }
}
