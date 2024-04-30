import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../booksearch/services/book/book.service';
import { Book } from '../models/book.model';
import { FormsModule } from '@angular/forms'; 
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  books: Book[] = [];


  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadBooks();
  }
  loadBooks(): void{
    this.bookService.getAllBooks().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Failed to load books', err)
    });
  }

// deleteBook(id: number, moveToCompleted: boolean): void{
//   this.bookService.deleteBook(id, moveToCompleted).subscribe({
//     next: () => this.loadBooks(),
//     error: (err) => console.error('Failed to delete book', err)
//   });
// }
  

}


