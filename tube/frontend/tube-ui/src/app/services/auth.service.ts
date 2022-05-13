import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  auth0 = new auth0.WebAuth({
    clientID: 'GBUM8Pn7RZqcBDWzXqyoEMRq2b996oZ8',
    domain: 'dev-jd7o62i6.us.auth0.com',
    responseType: 'token id_token',
    audience: 'http://localhost:8081',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile email'
  });

  constructor(private router: Router, private http: HttpClient) { }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        AuthService.setSession(authResult);
        this.validateUser(authResult.accessToken).subscribe(data => {
          window.location.hash = '';
          localStorage.setItem('userId', data.id);
          this.isUserLoggedIn.next(true);
        }, error => {
          console.error(error);
        });
      } else if (err) {
        console.log(err);
      }
      this.router.navigateByUrl('');
    });
  }

  validateUser(token: string): Observable<any> {
    return this.http.get('http://localhost:8081/api/user/validate',
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
      });
  }

  private static setSession(authResult: any): void {
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.router.navigateByUrl('');
    window.location.reload();    
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
    
  }

  public getUserId(): string|null {
    return localStorage.getItem('userId');
  }
}
