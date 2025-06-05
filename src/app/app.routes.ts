import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';
import { AuthService } from './services/auth.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeProfileComponent } from './change-profile/change-profile.component';
import { AdminHomepageComponent } from './admin-homepage/admin-homepage.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { LockUnlockComponent } from './lock-unlock/lock-unlock.component';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { CRUDDemoListViewComponent } from './components/cruddemo-list-view/cruddemo-list-view.component';
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
        data: { roles: ['user'] }
    },
    {
        path : 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthService],
        data: { roles: ['user'] }
    },
    {
        path:'change-profile',
        component: ChangeProfileComponent,
        canActivate: [AuthService],
        data: { roles: ['user'] }
    },
    {
        path:'admin-homepage',
        component: AdminHomepageComponent,
        canActivate: [AuthService],
        data: { roles: ['admin'] }
    },
    {
        path:'add-role',
        component: AddRoleComponent,
        canActivate: [AuthService],
         data: { roles: ['admin'] }
    },
    {
        path:'add-employee',
        component: AddEmployeeComponent,
        canActivate: [AuthService],
         data: { roles: ['admin'] }
    },
    {
        path:'lock-unlock',
        component: LockUnlockComponent,
        canActivate: [AuthService],
         data: { roles: ['admin'] }
    },
     {
        path:'role-permission',
        component: RolePermissionComponent,
        canActivate: [AuthService],
         data: { roles: ['admin'] }
    },
     {
        path:'employee-crud',
        component: CRUDDemoListViewComponent,
        canActivate: [AuthService],
         data: { roles: ['user'] }
    }
   
]
