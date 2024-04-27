import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../../../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getVolume(volumeId: string): Observable<Book[]> {
    const encodedString = encodeURIComponent(volumeId);
    const title = encodedString.replace(/%20/g, '%20');
    console.log(title);
    const url = `https://www.googleapis.com/books/v1/volumes?q=title:${title}&key=AIzaSyCz-eWeCBVGmZs8zpylRKIrVZRlsjPSxJE`;
    const headers = {
      Authorization: `AIzaSyCz-eWeCBVGmZs8zpylRKIrVZRlsjPSxJE`
    };



    return this.http.get<Book[]>(url, { headers }).pipe(map(this.extractBooks));
  }

  private extractBooks(response: any): Book[] {
    if (response.items) {
      return response.items.map((item: any) => ({
        title: item.volumeInfo.title || 'Title Not Available',
        authors: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Author Not Available',
        description: item.volumeInfo.description || 'Description Not Available',
        isbn: item.volumeInfo.industryIdentifiers ?
          item.volumeInfo.industryIdentifiers[0].identifier : 'ISBN Not Available'
      }));
    } else {
      return [];
    }
  }
}

