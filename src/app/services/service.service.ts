import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private http: HttpClient) { }
  base = 'http://localhost:3000/';

  getProducts():Observable<any>{
      return this.http.get(`${this.base}products`)
  }
  getCategories():Observable<any>{
      return this.http.get(`${this.base}categories`)
  }
}
