import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) {

  }

  registerUser(user: User) {
    return this.http.post<User>('api/user', user);
  }

  // loginUser(user: User) {
  //   return this.http.get<User>('/api/user', user);
  // }

  getUserById(user_id: number) {
    return this.http.get<User>(`/api/user/${user_id}`);
  }
  
}
