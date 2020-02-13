import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MockInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = request.url;
    const response = '/mock/mio-json.json';
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return next.handle(request).pipe(
      catchError((err, source) => {
        return of(new HttpResponse({body: response, headers}));
      })
    );
  }

}
