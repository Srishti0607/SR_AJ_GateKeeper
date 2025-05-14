import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GatekeeperService } from '../services/gatekeep.service';

@Component({
  selector: 'app-customer-homepage',
  templateUrl: './customer-homepage.component.html',
  styleUrl: './customer-homepage.component.css',
  standalone: false
})
export class CustomerHomepageComponent implements OnInit {
  userInfo:any;

  constructor(
    private router: Router,
    private gateSrv: GatekeeperService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.gateSrv.userInfo;
    console.log(this.userInfo);
  }

  handleSignOut(): void {
    // this.authService.signOut().subscribe({
    //   next: (response: any) => {
    //     if (response.status === 'Success') {
    //       this.router.navigate(['/login']);
    //     } else {
    //       alert(response.message);
    //     }
    //   },
    //   error: () => {
    //     alert('An error occurred while signing out');
    //   }
    // });
  }

  handleDeleteAccount(): void {
    // const payload = { email: this.userEmail };
    // this.authService.deleteAccount(payload, this.token).subscribe({
    //   next: (response: any) => {
    //     if (response.status === 'Success') {
    //       alert(response.message);
    //       this.router.navigate(['/login']);
    //     } else {
    //       alert(response.message);
    //     }
    //   },
    //   error: () => {
    //     alert('An error occurred while deleting the account');
    //   }
    // });
  }

}
