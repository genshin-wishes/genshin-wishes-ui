import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (
            err instanceof HttpErrorResponse &&
            err.status === StatusCodes.UNAUTHORIZED
          )
            this._router.navigate(['/logout']);
        },
      })
    );
  }
}
