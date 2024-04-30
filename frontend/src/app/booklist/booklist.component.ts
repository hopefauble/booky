import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  books: Book[] = [];
  private baseUrl = 'http://localhost:3000/books';
  
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void {
    this.http.get<Book[]>(this.baseUrl).subscribe(
      (response) => {
      this.books = response;
      },
      (error) => {
        console.error("error", error);
      }
    )};
}

