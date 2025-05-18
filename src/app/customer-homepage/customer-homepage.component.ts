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
  userInfo: any;
  showModal: boolean = false;

  constructor(
    private router: Router,
    public gateSrv: GatekeeperService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.gateSrv.userInfo;
  }

  handleDeleteAccount(): void {
    const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmed) {
      const payload = { email: this.userInfo?.EMAIL };
      this.gateSrv.deleteAccount(payload).subscribe({
        next: (response: any) => {
          if (response.status === 'Success') {
            alert(response.message);
            this.router.navigate(['/login']);
          } else {
            alert(response.message);
          }
        },
        error: () => {
          alert('An error occurred while deleting the account');
        }
      });
    }

  }

}
