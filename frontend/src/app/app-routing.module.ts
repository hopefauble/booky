import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooklistComponent } from './booklist/booklist.component';
import { BooksearchComponent } from './booksearch/booksearch.component';
import { CompletedbooksComponent } from './completedbooks/completedbooks.component';

export const routes: Routes = [
  { path: '', component: BooksearchComponent},
  { path: 'list', component: BooklistComponent},
  { path: 'completed', component: CompletedbooksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}