import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Utilisateur} from '../interfaces/utilisateur';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly _backendURL: any;
  private _currentUtilisateur: Utilisateur;

  constructor(private _http: HttpClient, private _router: Router) {
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

  public get currentUtilisateur(): Utilisateur {
    return this._currentUtilisateur;
  }


  login(utilisateur: Utilisateur) {
    this._http.post(this._backendURL.login, utilisateur, {responseType: 'text'})
        .subscribe( resp => {
          const resp_util = JSON.parse(resp);
          if (resp_util.token !== '') {
            utilisateur.token = resp_util.token;
            this._currentUtilisateur = utilisateur;
            localStorage.setItem(
                'currentUtilisateur',
                JSON.stringify(this._currentUtilisateur)
            );
            this._router.navigate(['/']);
          } else {
            console.log('Authentification failed');
            // alert('failed');
          }
        });
  }

  logout() {
    localStorage.removeItem('currentUtilisateur');
    this._router.navigate(['/']);

  }

}
