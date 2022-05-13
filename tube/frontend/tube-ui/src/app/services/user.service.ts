import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../UserDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {

  }

  subscribeToUser(userId: string): Observable<any> {
    return this.httpClient.post("http://localhost:8081/api/user/subscribe/" + userId, null,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });
  }

  getUserProfile(userId: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>("http://localhost:8081/api/user/" + userId,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      });
  }

  getUserHistory(userId: string | ""): Observable<Set<string>> {
    return this.httpClient.get<Set<string>>("http://localhost:8081/api/user/" + userId + "/history", {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    });
  }

}

