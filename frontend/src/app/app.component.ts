import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BooksearchModule } from './booksearch/booksearch.module';
import { RouterLink } from '@angular/router';
import { AuthModule } from './auth/auth.module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BooksearchModule, AuthModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Booky';
}
