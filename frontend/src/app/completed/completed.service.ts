import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Completed } from '../models/completed.model';

@Injectable({
  providedIn: 'root'
})
export class CompletedService {

  constructor(private http: HttpClient) { }

  getCompletedBooks(): Observable<Completed[]> {
    const url = 'http://localhost:3000/completed';
    return this.http.get<Completed[]>(url);
  }

  deleteBook(id: number): Observable<any> {
    const url = `http://localhost:3000/completed/${id}`;
    console.log("deleting: ", url);
    return this.http.delete<Completed>(url).pipe(
      catchError((error: any) => {
        console.error('Error deleting book:', error);
        throw error; // Rethrow the error to be caught by the component
      })
    );
  }

  moveBook(id: number): Observable<any> {
    const url = `http://localhost:3000/completed/${id}?move=true`;
    console.log("moving: ", url);
    return this.http.delete<Completed>(url).pipe(
      catchError((error: any) => {
        console.error('Error moving book:', error);
        throw error; // Rethrow the error to be caught by the component
      })
    );
  }

}
