import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksearchComponent } from './booksearch.component';
import { BookWidget } from './widgets/book-widget/book.widget';

@NgModule({
  declarations: [
    BooksearchComponent,
    BookWidget,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BooksearchComponent
  ]
})
export class BooksearchModule { }
