import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatekeeperService } from '../services/gatekeep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-profile',
  templateUrl: './change-profile.component.html',
  styleUrl: './change-profile.component.css',
  standalone: false
})
export class ChangeProfileComponent implements OnInit {
  changeProfileForm!: FormGroup;
  userInfo: any;

  constructor(private fb: FormBuilder,public gateSrv: GatekeeperService,private router: Router) { }

  ngOnInit() {
    this.userInfo = this.gateSrv.userInfo;
    this.changeProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.changeProfileForm.invalid) return;
    const payload = {
      email: this.userInfo?.EMAIL,
      firstName: this.changeProfileForm.value.firstName,
      lastName: this.changeProfileForm.value.lastName
    };

    this.gateSrv.changeProfile(payload).subscribe({
      next: (res: any) => {
        if (res.status.toLowerCase() === 'success') {
          alert(res.message);
          this.changeProfileForm.reset();
          this.getProfile();
        } else {
          alert(res.message);
          this.changeProfileForm.reset();
        }
      },
      error: () => {
        alert('An error occurred while changing profile');
      }
    });
  }

  getProfile(){
    const payload = {
      email: this.userInfo?.EMAIL
    };
    this.gateSrv.getProfileData(payload).subscribe({
      next: (res: any) => {
        if (res.status.toLowerCase() === 'success') {
          this.gateSrv.userInfo = res?.user;
          this.router.navigate(['/customer-homepage']);
        } else {
          alert(res.message);
          this.changeProfileForm.reset();
        }
      },
      error: () => {
        alert('An error occurred while changing profile');
      }
    });
  }

  goBack(){
    this.router.navigate(['/customer-homepage']);
  }

}
