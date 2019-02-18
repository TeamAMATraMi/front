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
    console.log(this._backendURL);
    return this._http.post<Observable<boolean>>(this._backendURL.login, utilisateur, this._options());
  }


  /**
   * Function to return request options
   */
  private _options(headerList: Object = {}): any {
    return { headers: new HttpHeaders(Object.assign({
        'Content-Type': 'application/json'
      }, headerList)) };
  }

}
