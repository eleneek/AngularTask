import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {FiltersForm} from './models/filters.interface';
import {User} from './models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public addAndEditModalOpened = false;
  constructor(private http: HttpClient) {}
  filtersForm: FiltersForm = {
    lastName: '',
    identificationNumber: '',
    mobileNumber: '',
  };

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
    let httpParams = new HttpParams();
    if (this.filtersForm.lastName) {
      httpParams = httpParams.append(
        'lastName_like',
        this.filtersForm.lastName
      );
    }
    if (this.filtersForm.identificationNumber) {
      httpParams = httpParams.append(
        'identificationNumber_like',
        this.filtersForm.identificationNumber
      );
    }

    if (this.filtersForm.mobileNumber) {
      httpParams = httpParams.append(
        'mobileNumber_like',
        this.filtersForm.mobileNumber
      );
    }

    return this.http.get<User[]>(
      `${environment.endpoint}/users?${httpParams.toString()}`
    );
  }
}
