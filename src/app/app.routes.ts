import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';
import { AuthService } from './services/auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeProfileComponent } from './change-profile/change-profile.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AddRoleComponent } from './add-role/add-role.component';
export const routes: Routes = [
    {
        path:'',
        component: SignUpComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path : 'customer-homepage',
        component: CustomerHomepageComponent,
        canActivate: [AuthService],
    },
    {
        path : 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthService],
    },
    {
        path:'change-profile',
        component: ChangeProfileComponent,
        canActivate: [AuthService],
    },
    {
        path:'admin-homepage',
        component: AdminHomepageComponent,
        canActivate: [AuthService],
    },
    {
        path:'add-role',
        component: AddRoleComponent,
        canActivate: [AuthService],
    }
   
]
