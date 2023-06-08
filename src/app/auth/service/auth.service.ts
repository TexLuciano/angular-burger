import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {

  constructor(private http: HttpClient) { }
  base = 'http://localhost:3000/';


private handleError(error: HttpErrorResponse) {
  if (error.status === 409) {
    console.error('An error occurred:', error.error);
  } else {

    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }

  return throwError(() => new Error('Something bad happened; please try again later.'));
}

  createUser(user:any):Observable<any> {
    return  this.http.post(`${this.base}users`, user).pipe(
      catchError(this.handleError)
    )
  }

  loginUser(user:any):Observable<any>{
     return  this.http.post(`${this.base}sessions`, user)
  }

}
