import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CONFIG_TOAST } from '../interfaces/utils.interface';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private toast: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error:HttpErrorResponse) => {
                this.toast.error(error.error.message, 'Error',CONFIG_TOAST);
                return throwError(() => error);
            }),
        )
    }
}