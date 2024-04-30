import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
