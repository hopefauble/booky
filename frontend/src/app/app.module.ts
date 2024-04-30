import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './booksearch/services/book/book.service';
import { BooksearchModule } from './booksearch/booksearch.module';
import { AppRoutingModule } from './app-routing.module';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { BooklistComponent } from './booklist/booklist.component';
import { BooksearchComponent } from './booksearch/booksearch.component';
import { BooklistModule } from './booklist/booklist.module';


@NgModule({
  declarations: [
    AppComponent,
    BookdetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BooksearchModule,
    AppRoutingModule,
    BooklistModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [BookService,],
  bootstrap: [AppComponent]
})
export class AppModule { }