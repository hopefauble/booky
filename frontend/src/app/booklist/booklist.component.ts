import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';
import { BooklistService  } from './booklist.service';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BooklistComponent implements OnInit {

  books: Book[] = [];

  constructor(private booklistService: BooklistService) { }

  ngOnInit(): void {
    this.booklistService.getBooks().subscribe(
      (books: Book[]) => {
        this.books = books;
      },
      (error: any) => {
        console.error('Error fetching completed books:', error);
      }
    )
  }

  onMove(id: number) {
    console.log("moving ", id);
    this.booklistService.moveBook(id).subscribe(
      () => {
        console.log("Book moved successfully.");
        this.ngOnInit(); 
      },
      (error: any) => {
        console.error('Error deleting book:', error);
      }
    );
  }

  onDelete(id: number) {
    console.log("deleting ", id);
    this.booklistService.deleteBook(id).subscribe(
      () => {
        console.log("Book deleted successfully.");
        this.ngOnInit(); 
      },
      (error: any) => {
        console.error('Error deleting book:', error);
      }
    );
  }

}
