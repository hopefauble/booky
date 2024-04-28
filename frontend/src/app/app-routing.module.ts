import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksearchComponent } from './booksearch/booksearch.component';
import { LoginComponent } from '/workspace/frontend/src/app/auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: 'search', component: BooksearchComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}