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
        console.log(books);
        this.completedBooks = books;
      },
      error => {
        console.error('Error fetching completed books:', error);
      }
    );
  }
}
