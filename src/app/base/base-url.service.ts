import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class BaseUrlService {
  public readonly httpClient!: HttpClient;

  constructor(protected readonly injector: Injector) {
    if (injector === null || injector === undefined) {
      throw new Error('injector nao pode ser nulo');
    }
  }

  private apiBase = 'http://localhost:3000/';

  public httpGet(endPoint: string): Observable<any> {
    return this.httpClient.get(`${this.apiBase}${endPoint}`);
  }

  public httpPost(endPoint: string, dados: any): Observable<any> {
    console.log(dados, endPoint);
    
    return this.httpClient.post(`${this.apiBase}${endPoint}`, dados);
  }

  public httpDelete(endPoint: string): Observable<any> {
    return this.httpClient.delete(`${this.apiBase}${endPoint}`);
  }

  public httpPut(endPoint: string, dados: any): Observable<any> {
    return this.httpClient.put(`${this.apiBase}${endPoint}`, dados);
  }
}
