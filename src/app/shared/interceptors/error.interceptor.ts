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
                let text = '';
                console.log(error, 'aqui')
                if (error.error.errors && typeof error.error.errors !== 'string') {
                    for (let prop in error.error.errors) {
                        text += error.error.errors[prop].join('\n')
                    }
                }
                this.toast.error(`${error.error.message}. \n ${text}`, 'Error',CONFIG_TOAST);
                return throwError(() => error);
            }),
        )
    }
}