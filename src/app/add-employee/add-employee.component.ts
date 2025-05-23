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
  showAddEditForm: any;
  isView: any;
  editData: any;

  constructor(private fb: FormBuilder, public gateSrv: GatekeeperService, private router: Router) { }

  ngOnInit() {
    this.getAllEMployee();
    this.gateSrv.performAction$.subscribe(data => {
      if (data) {
        this.getAllEMployee();
        this.showAddEditForm = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin-homepage']);
  }


  fetchRoles() {
    this.gateSrv.getRole().subscribe({
      next: (items) => this.roles = items,
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  addEmployee() {
    this.gateSrv.setEmpFuncData({
      editData: undefined,
      isView: false,
      mode: 'employee',
      showRoleDropdown: true
    });
    this.showAddEditForm = true;
  }


  getAllEMployee() {
    this.gateSrv.getAllEmp().subscribe({
      next: (items) => this.EmployeeList = items,
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  employeeDetails(emp: any, opr: boolean) {
      this.gateSrv.setEmpFuncData({
      editData: emp,
      isView: opr,
      mode: 'employee',
      showRoleDropdown: true
    });
    this.showAddEditForm = true;
  }

  handleEmpDelete(emp: any) {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.gateSrv.deleteEmp(emp.ID, this.gateSrv?.userInfo?.EMAIL).subscribe({
      next: (response: any) => {
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
