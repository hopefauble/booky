import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksearchComponent } from './booksearch/booksearch.component';
import { CompletedComponent } from './completed/completed.component';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
  { path: '', component: BooksearchComponent},
  { path: 'completed', component: CompletedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule {}