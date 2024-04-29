import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../booksearch/services/book/book.service';
import { Book } from '../models/book.model';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {
  books: Book[] = [];
  userId!: string;
  newBookIsbn!: number;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooksByUser(this.userId).subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Failed to load books', err)
    });
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => this.loadBooks(),  // Refresh the list after deletion
      error: (err) => console.error('Failed to delete book', err)
    });
  }

  addBook(isbn: number): void {
    this.bookService.addBookToUser(isbn, this.userId).subscribe({
      next: () => this.loadBooks(),
      error: (err) => console.error('Failed to add book', err)
    });
  }
}


