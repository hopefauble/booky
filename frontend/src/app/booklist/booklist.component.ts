import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../booksearch/services/book/book.service';
import { Book }
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
    this.loadBooks();
  }
  loadBooks(): void{
    this.bookService.getBooksById().subscribe({
      next: (data) => this.books = data,
      error: (err) => console.error('Failed to load books', err)
    });
  }
deleteBook(id: number, moveToCompleted: boolean): void{
  this.bookService.deleteBook(id, moveToCompleted).subscribe({
    next: () => this.loadBooks(),
    error: (err) => console.error('Failed to delete book', err)
  });
}
  

}


