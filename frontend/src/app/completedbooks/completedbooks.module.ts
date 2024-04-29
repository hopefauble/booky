import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedbooksComponent } from './completedbooks.component';



@NgModule({
  declarations: [CompletedbooksComponent],
  imports: [
    CommonModule
  ],
  exports: [CompletedbooksComponent]
})
export class CompletedbooksModule { }
