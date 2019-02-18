import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Utilisateur} from '../interfaces/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    Object.keys(environment.backend.endpoints.auth)
        .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.auth[ k ]}`);

  }

  login(utilisateur: Utilisateur): Observable<any> {
    console.log(utilisateur);
    return this._http.post(this._backendURL.login, utilisateur, {responseType: 'text'});
  }

}
