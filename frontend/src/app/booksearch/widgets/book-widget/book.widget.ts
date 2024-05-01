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

    const url = `http://localhost:3000/books/`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); // Set content type to JSON
    
    this.http.post<Book[]>(url, this.Book, { headers }).subscribe(
      (response) => {
        console.log('Success: ', response);
      },
      (error) => {
        console.error('Error: ', error);
      }
    );
  }
}