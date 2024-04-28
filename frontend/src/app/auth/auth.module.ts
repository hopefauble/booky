import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterModule } from './register/register.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginComponent,
    RegisterModule,
  ],
  exports: [LoginComponent, RegisterModule]
})
export class AuthModule { }
