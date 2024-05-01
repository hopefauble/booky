import { Component, OnInit } from '@angular/core';
import { Completed } from '../models/completed.model';
import { CompletedService } from './completed.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css'],
  standalone: true,
  imports: [ CommonModule]
})
export class CompletedComponent implements OnInit {

  completedBooks: Completed[] = [];

  constructor(private completedService: CompletedService) { }

  ngOnInit(): void {
    this.completedService.getCompletedBooks().subscribe(
      books => {
        this.completedBooks = books;
      },
      error => {
        console.error('Error fetching completed books:', error);
      }
    );
  }

  onMove(id: number) {
    console.log("moving ", id);
    this.completedService.moveBook(id).subscribe(
      () => {
        console.log("Book moved successfully.");
        this.ngOnInit(); 
      },
      error => {
        console.error('Error deleting book:', error);
      }
    );
  }

  onDelete(id: number) {
    console.log("deleting ", id);
    this.completedService.deleteBook(id).subscribe(
      () => {
        console.log("Book deleted successfully.");
        this.ngOnInit(); 
      },
      error => {
        console.error('Error deleting book:', error);
      }
    );
  }
  
}
