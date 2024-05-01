import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { Completed } from '../models/completed.model';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooklistService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    const url = 'http://localhost:3000/books';
    return this.http.get<Book[]>(url);
  }

  deleteBook(id: number): Observable<any> {
    const url = `http://localhost:3000/books/${id}`;
    console.log("deleting: ", url);
    return this.http.delete<Book>(url).pipe(
      catchError((error: any) => {
        console.error('Error deleting book:', error);
        throw error;
      })
    );
  }

  moveBook(id: number): Observable<any> {
    const url = `http://localhost:3000/completed/${id}`;
    const headers = HttpHeaders;
    return this.http.post<Completed>(url, headers).pipe(
      catchError((error: any) => {
        console.error('Error moving book:', error);
        throw error;
      })
    );
  }



  updateNotes(notes: string, id: number): Observable<any> {
    const url = `http://localhost:3000/books/${id}`;
    const headers = new HttpHeaders();

    return this.http.put<Book>(url, notes, { headers }); 
  }


}
