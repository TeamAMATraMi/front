import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from '../services/login.service';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUser = this.loginService.currentUtilisateur;
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Content-Type'  : 'application/json; charset=utf-8',
                    'Accept'        : 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Authorization' : `Bearer ${currentUser.token}`
                }
            });
        }


        /*
        return next.handle(request).pipe(catchError(err => {
                console.log(request);
                return throwError(err);
        }));
        */
        return next.handle(request);
    }
}
