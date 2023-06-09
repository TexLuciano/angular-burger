import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('userAngularBurger');
    let requestClone;
    if (token) {
      requestClone = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }else{
      requestClone = request
    }


    return next.handle(requestClone);
  }
}
