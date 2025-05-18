import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatekeeperService } from '../services/gatekeep.service';
import { Router, RouterConfigOptions } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  standalone: false
})
export class AddEmployeeComponent implements OnInit {
  EmployeeList: any;
  employeeForm!: FormGroup;
  roles: any;
  showAddEditForm: boolean = false;
  isView: boolean = true;

  constructor(private fb: FormBuilder, public gateSrv: GatekeeperService,private router: Router) { }

  ngOnInit() {
    this.getAllEMployee();
    this.getForm(undefined, false);
  }

   goBack(){
    this.router.navigate(['/admin-homepage']);
  }

  getForm(data: any, opr: boolean) {
    this.employeeForm = this.fb.group({
      firstName: [{ value: data == undefined ? '' : data?.FIRSTNAME, disabled: opr }, Validators.required],
      lastName: [{ value: data == undefined ? '' : data?.LASTNAME, disabled: opr }, Validators.required],
      email: [{ value: data == undefined ? '' : data?.EMAIL, disabled: opr }, [Validators.required, Validators.email]],
      password: [{ value: data == undefined ? '' : data?.PASSWORD, disabled: opr }],
      role: [{ value: data == undefined ? '' : data?.USERROLE, disabled: opr }, Validators.required],
      id: [{ value: data == undefined ? '' : data?.ID, disabled: opr}]
    });

  }

  fetchRoles() {
    this.gateSrv.getRole().subscribe({
      next: (items) => this.roles = items,
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  addEmployee() {
    this.showAddEditForm = true;
    this.isView = true;
    this.fetchRoles();
  }

  addEmployeeDetails(mode: any) {
    console.log(this.employeeForm)
    let payload = {
      'FIRSTNAME': this.employeeForm.get('firstName')?.value,
      'LASTNAME': this.employeeForm.get('lastName')?.value,
      'EMAIL': this.employeeForm.get('email')?.value,
      'PASSWORD': this.employeeForm.get('password')?.value == '' ? '12345' : this.employeeForm.get('password')?.value,
      'ROLENAME': this.employeeForm.get('role')?.value,
      'mode': mode,
      'email':this.gateSrv.userInfo.EMAIL
    }
    if (this.isView) {
      this.gateSrv.signup(payload).subscribe((res: any) => {
        if (res) {
          if (res.status == 'Success') {
            this.employeeForm.reset();
            this.showAddEditForm=false;
            this.getAllEMployee();
            alert(res.message);
          }
        }
      });
    } else {
      this.gateSrv.updateEmp(this.employeeForm.get('id')?.value,payload).subscribe((res: any) => {
        if (res) {
          if (res.status == 'Success') {
            this.employeeForm.reset();
            this.showAddEditForm=false;
            this.getAllEMployee();
            alert(res.message);
          }
        }
      });
    }
  }

  getAllEMployee() {
    this.gateSrv.getAllEmp().subscribe({
      next: (items) => this.EmployeeList = items,
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  employeeDetails(emp: any, opr: boolean) {
    this.showAddEditForm = true;
    this.fetchRoles();
    this.getForm(emp, opr);
    this.isView = opr;
  }

   handleEmpDelete(emp: any) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.gateSrv.deleteEmp(emp.ID,this.gateSrv?.userInfo?.EMAIL).subscribe({
      next: (response:any) => {
        if (response.status === 'Success') {
        this.getAllEMployee();
          alert(response.message);
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        alert('An error occurred while deleting role');
        console.error('Delete role error:', error);
      }
    });
  }



}
