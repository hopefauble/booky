import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../book.service';
import { Book } from '../../../book.model';
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
  ) {}
}