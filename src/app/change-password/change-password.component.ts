import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatekeeperService } from '../services/gatekeep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  standalone: false
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  userInfo: any;

  constructor(private gateSrv: GatekeeperService,private fb: FormBuilder,private router: Router){}

  ngOnInit(): void {
    this.userInfo = this.gateSrv.userInfo;
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) return;
    const payload = {
      email: this.userInfo?.EMAIL,
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword
    };

    this.gateSrv.changeProfile(payload).subscribe({
      next: (res: any) => {
        if (res.status.toLowerCase() === 'success') {
          alert(res.message);
          this.changePasswordForm.reset();
          this.router.navigate(['/customer-homepage']);
        } else {
          alert(res.message);
          this.changePasswordForm.reset();
        }
      },
      error: () => {
        alert('An error occurred while changing password');
      }
    });
  }

  goBack(){
    this.router.navigate(['/customer-homepage']);
  }

}
