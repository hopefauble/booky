import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './booksearch/services/book/book.service';
import { BooksearchModule } from './booksearch/booksearch.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BooksearchModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }