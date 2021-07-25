import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {User} from './models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  addUser(request: User): Observable<User> {
    return this.http.post<User>(`${environment.endpoint}/users`, request);
  }

  updateUser(request: User): Observable<User> {
    return this.http.put<User>(
      `${environment.endpoint}/users/${request.id}`,
      request
    );
  }

  deleteUser(request: User): Observable<User> {
    return this.http.delete<User>(
      `${environment.endpoint}/users/${request.id}`
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.endpoint}/users`);
  }
}
