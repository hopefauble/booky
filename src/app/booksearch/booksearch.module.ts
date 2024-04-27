import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksearchComponent } from './booksearch.component';

@NgModule({
  declarations: [
    BooksearchComponent
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
