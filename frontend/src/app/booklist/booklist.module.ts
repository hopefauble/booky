import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooklistComponent } from './booklist.component';



@NgModule({
  declarations: [BooklistComponent],
  imports: [
    CommonModule
  ],
  exports: [BooklistComponent]
})
export class BooklistModule { }
