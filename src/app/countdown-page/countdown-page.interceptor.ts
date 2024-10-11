import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable()
export class CountdownInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === '/api/deadline') {
      const mockResponse = {
        secondsLeft: 20
      };

      return of(new HttpResponse({
        status: 200,
        body: mockResponse
      }));
    }

    return next.handle(req);
  }
}
