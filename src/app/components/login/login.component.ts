import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GatekeeperService } from '../../services/gatekeep.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword:boolean = false;

  constructor(private fb: FormBuilder, private gateSrv: GatekeeperService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  loginUser() {
    let payload = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.gateSrv.login(payload).subscribe((res: any) => {
      if (res) {
        console.log(res)
        if (res.status.toLowerCase() === 'success') {
          this.loginForm.reset();
          alert(res.message);
          this.gateSrv.token = res?.token;
          this.gateSrv.userInfo = res?.user
          if (res.user.USERROLE === 'Admin') {
            this.router.navigate(['/admin-homepage']);
        } else {
          this.router.navigate(['/customer-homepage']);
        }
        }
      }
    });
  }

  goToSignup(){
    this.router.navigate(['/']);
  }

}
