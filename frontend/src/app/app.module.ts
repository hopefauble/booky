import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './booksearch/services/book/book.service';
import { BooksearchModule } from './booksearch/booksearch.module';
import { AppRoutingModule } from './app-routing.module';
import { CompletedModule } from './completed/completed.module';
import { BooklistComponent } from './booklist/booklist.component';


@NgModule({
  declarations: [
    AppComponent,
    BooklistComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BooksearchModule,
    AppRoutingModule,
    CompletedModule,
  ],
  providers: [BookService,],
  bootstrap: [AppComponent]
})
export class AppModule { }