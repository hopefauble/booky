import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksearchComponent } from './booksearch/booksearch.component';
import { CompletedComponent } from './completed/completed.component';
import { CommonModule } from '@angular/common';
import { BooklistComponent } from './booklist/booklist.component';

export const routes: Routes = [
  { path: '', component: BooksearchComponent},
  { path: 'list', component: BooklistComponent},
  { path: 'completed', component: CompletedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})

export class AppRoutingModule {}