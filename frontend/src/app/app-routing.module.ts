import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooklistComponent } from './booklist/booklist.component';
import { BooksearchComponent } from './booksearch/booksearch.component';

export const routes: Routes = [
  { path: '', component: BooksearchComponent},
  { path: 'bookshelf', component: BooklistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}