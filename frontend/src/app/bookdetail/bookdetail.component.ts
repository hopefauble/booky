import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookService } from '../booksearch/services/book/book.service';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent {
  @Input()
  book!: Book;
  @Output() onAddedToReadingList = new EventEmitter<Book>();

  constructor(private bookService: BookService) {}

  AddtoReadinglist(): void{

    this.bookService.addBookToUser(this.book.is).subscribe({
      next: () => {
        this.onAddedToReadingList.emit(this.book);
        alert('Book added successfuly');
      },
      error: (error) => {
        console.error('Failed to add book', error);
      }
    });
  }
}
