import { Routes } from '@angular/router';
import { BooksearchComponent } from './booksearch/booksearch.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'search', component: BooksearchComponent},
    { path: 'login', component: LoginComponent }
];
