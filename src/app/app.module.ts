import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';
import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HrssInterceptor } from './interceptor/hrssInterceptor';
export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HrssInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    CustomerHomepageComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
