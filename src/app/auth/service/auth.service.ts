import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { BehaviorSubject, Observable,  } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private routes: Router
  ) {}
  base = 'http://localhost:3000/';

  private subjectLogin: BehaviorSubject<any> = new BehaviorSubject(false);

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.base}users`, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post(`${this.base}sessions`, user);
  }

  hasUser(): Observable<any> {
    const token = sessionStorage.getItem('userAngularBurger');
    if (token) {
      this.subjectLogin.next(true);
    }
    return this.subjectLogin.asObservable();
  }

  logOut() {
  
    this.subjectLogin.next(false);
    sessionStorage.removeItem('userAngularBurger');
      this.routes.navigateByUrl('/login')
  }
}
