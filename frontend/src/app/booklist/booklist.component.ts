import { Component, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit{
  books: Book[] = [];
  constructor(private bookService: BookService){}
  
  ngOnInit(): void {
  }

  extractBooks(title: string): void{
    this.bookService.getVolume(title).subscribe({
      next: (books) => {
        this.books = books;
      }, 
      error: (error) => console.error('Failed to fetch books', error)
    });
  }

  deleteBook(title: string): void{
    this.bookService.deleteBookByTitle(title).subscribe({
      next: () => {
        this.books = this.books.filter(book => book.title != title); 
        console.log('Book deleted successfully'); 
      },
      error: (error) => {
        console.error("Failed to delete the book", error);
      }
    });
  }
}
