import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooklistComponent } from './booklist.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BooklistComponent], 
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [BooklistComponent]
})
export class BooklistModule { }
