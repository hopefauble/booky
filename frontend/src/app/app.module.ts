import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './booksearch/services/book/book.service';
import { BooksearchModule } from './booksearch/booksearch.module';
import { AppRoutingModule } from './app-routing.module';
import { CompletedbooksModule } from './completedbooks/completedbooks.module';
import { BookdetailComponent } from './bookdetail/bookdetail.component';


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
    CompletedbooksModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [BookService,],
  bootstrap: [AppComponent]
})
export class AppModule { }