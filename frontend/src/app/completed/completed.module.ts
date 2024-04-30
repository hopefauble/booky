import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompletedComponent } from './completed.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompletedComponent
  ],
  exports: [CompletedComponent]
})
export class CompletedModule { }
