import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../../models/book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'book',
  templateUrl: './book.widget.html',
  styleUrls: ['./book.widget.css']
})
export class BookWidget {

  @Input() Book!: Book;

  constructor(
    public bookService: BookService,
    private router: Router,
    private http: HttpClient
  ) { }

  onClick() {
    let newISBN = this.extractNumericISBN(this.Book.isbn)
    const url = `http://localhost:3000/books/${newISBN}`
    const headers = new HttpHeaders();

    // console.log('the book isbn is', this.Book);
    // console.log('adter func: ', this.extractNumericISBN(this.Book.isbn));

    this.http.post<Book[]>(url, { headers }).subscribe(
      (response) => {
        console.log('Success:', response);
      },
      (error) => {
        console.error('Error: raaaaaaaa', error);
      }
    );
  }
  extractNumericISBN(isbn: any) {
    // Remove any non-digit characters from the string
    const numericISBN = isbn.replace(/\D/g, '');
    return numericISBN;
  }

}