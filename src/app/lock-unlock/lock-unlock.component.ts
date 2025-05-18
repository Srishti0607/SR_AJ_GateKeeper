import { Component, OnInit } from '@angular/core';
import { GatekeeperService } from '../services/gatekeep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lock-unlock',
  templateUrl: './lock-unlock.component.html',
  styleUrl: './lock-unlock.component.css',
  standalone: false
})
export class LockUnlockComponent implements OnInit {
  EmployeeList: any = [];

  constructor(public gateSrv: GatekeeperService,private router: Router){}

  ngOnInit(){
     this.getAllEMployee();
  }

   goBack(){
    this.router.navigate(['/admin-homepage']);
  }

    getAllEMployee() {
    this.gateSrv.getAllEmp().subscribe({
      next: (items) => this.EmployeeList = items,
      error: (err) => console.error('Error fetching roles:', err)
    });
  }

  toggleLockStatus(id:any,ISUSERLOCKED:any){
    let userLocked = ISUSERLOCKED == 0 ? 1 : 0;
    this.gateSrv.updateEmpDet(id,userLocked).subscribe({
      next: (response:any) => {
        if (response.status === 'Success') {
        this.getAllEMployee();
          alert(response.message);
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        alert('An error occurred while updating user');
      }
    });

  }

}
