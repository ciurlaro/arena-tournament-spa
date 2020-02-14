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


  handleMockResponse(request: HttpRequest<unknown>): string {
    const words = request.url.split("/");

    switch (request.url) {
      case "/isAccountVerified":
        return "VERIFICATION_STATUS_RESPONSE";
      case "/isAccountSubscribed":
        return "SUBSCRIPTION_STATUS_RESPONSE";
      default:
        return this.singleOrMultipleResponse(request, words);
    }

  }

  private singleOrMultipleResponse(request: HttpRequest<unknown>, words: string[]) {

    switch (words.length) {
      case 1:
        return lengthOneCase(request, words);
      case 2:
        return `single_${words[0]}_response`;
      default:
        return DefaultCase();
    }

    function lengthOneCase(request: HttpRequest<unknown>, words: string[]): string {
      switch (request.method) {
        case "GET":
          return `multiple_${words[0].split("?")[0]}_response`;
        default:
          return `single_${words[0]}_response`
      }
    }
    function DefaultCase(): string {
      switch (words[1]) {
        case "search":
          return `multiple_${words[0]}_response`;
        default: {
          if (["game", "tournament", "registration", "match", "user"].includes(words[words.length - 1]))
            return `single_${words[words.length - 1]}_response`;
          else if (words[words.length - 1] === "admin")
            return "single_user_response";
          else
            throw "Request cannot be handled by the mock engine"
        }
      }
    }
  }
}

