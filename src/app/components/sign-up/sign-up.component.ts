import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatekeeperService } from '../../services/gatekeep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  standalone: false
})
export class SignUpComponent {
  signupForm!: FormGroup;
  showPassword:boolean = false;

  constructor(private fb: FormBuilder,private gateSrv: GatekeeperService, private router: Router){}

  ngOnInit(){
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  signupUser(){
    let payload = {
      'FIRSTNAME': this.signupForm.get('firstName')?.value,
      'LASTNAME': this.signupForm.get('lastName')?.value,
      'EMAIL': this.signupForm.get('email')?.value,
      'PASSWORD': this.signupForm.get('password')?.value == '' ? '12345' : this.signupForm.get('password')?.value,
      'mode':'signup'
    }
    this.gateSrv.signup(payload).subscribe((res: any) => {
      if (res) {         
        if (res.status == 'Success') {
          this.signupForm.reset();
          alert(res.message);
      }
    }
    });
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
