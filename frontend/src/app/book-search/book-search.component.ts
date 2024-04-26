import { Component } from '@angular/core';
import { Book, BookService } from '../book.service';
import './book-search.component.css';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  searchQuery : any = '';
  searchResults: any[] = [];
  books: Book[] = [];

  SearchForm = this.formBuilder.group({
    query: '',
  });

  constructor( 
    private formBuilder: FormBuilder,
    private bookService: BookService) {}

  onSubmit() : void {
    this.searchQuery = this.SearchForm.value.query
    console.log(this.SearchForm.value.query)
    if (this.searchQuery.trim() !== '') {
      // this.bookService.searchBooks(this.searchQuery).subscribe(
      //   (results) => {
      //     this.searchResults = results;
      //   },
      //   (error) => {
      //     console.error(error);
      //   }
      // );
      this.bookService.getVolume(this.searchQuery).subscribe(
        (response) => {
          this.books = response; 
          console.log('hi');
      },
      (error) => {
            console.error(error);
            console.log("sad")
          }
      );
    } else {
      this.searchResults = [];
      
    }
  }
  
}
