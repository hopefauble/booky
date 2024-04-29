import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '../models/book.model';
import { BookService } from './services/book/book.service';

@Component({
  selector: 'app-booksearch',
  templateUrl: './booksearch.component.html',
  styleUrls: ['./booksearch.component.css']
})
export class BooksearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  books: Book[] = [];

  SearchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService
  ) {
    this.SearchForm = this.formBuilder.group({
      query: ['']
    });
  }

  onSubmit(): void {
    this.searchQuery = this.SearchForm.value.query.trim();
    console.log(this.searchQuery);
    if (this.searchQuery !== '') {
      this.bookService.getVolume(this.searchQuery).subscribe(
        (response) => {
          this.books = response; 
          console.log('Book retrieval success.');
        },
        (error) => {
          console.log("Book retrieveal failure: ", error);
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
