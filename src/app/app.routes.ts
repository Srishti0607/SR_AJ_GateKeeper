import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
export const routes: Routes = [
    {
        path:'',
        component: SignUpComponent
    },
    {
        path:'login',
        component:LoginComponent
    }
   
]
