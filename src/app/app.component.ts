import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksearchModule } from './booksearch/booksearch.module';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BooksearchModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Booky';
}
