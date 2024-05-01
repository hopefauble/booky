import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooklistComponent } from './booklist.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BooklistComponent
  ],
  exports: [BooklistComponent]
})
export class BooklistModule { }
