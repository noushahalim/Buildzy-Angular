import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './services/common.service'; 
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private commonService: CommonService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this.commonService.token;

    if (isLoggedIn) {
      const token = this.commonService.token;
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authRequest);
    } else {
      return next.handle(request);
    }
  }
}
