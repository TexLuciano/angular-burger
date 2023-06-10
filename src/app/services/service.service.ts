import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categories, Product } from '../pages/types/types';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor( private http: HttpClient) { }
  base = 'http://localhost:3000/';



  getProducts():Observable<Product[]>{
    
      return this.http.get<Product[]>(`${this.base}products`)
  }


  getCategories():Observable<Categories[]>{
      return this.http.get<Categories[]>(`${this.base}categories`)
  }


  sendOrder(orders:any):Observable<any>{
    return this.http.post(`${this.base}orders`, {products:orders})
  }

}
