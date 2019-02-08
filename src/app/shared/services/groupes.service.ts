import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {Groupe} from '../interfaces/groupe';

@Injectable({
  providedIn: 'root'
})
export class GroupesService {

  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    Object.keys(environment.backend.endpoints.groupes)
        .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.groupes[ k ]}`);
  }

  /**
   * Function to return all Groupes
   */
  fetch(): Observable<Groupe[]> {
    return this._http.get<Groupe[]>(this._backendURL.allGroupes)
        .pipe(
            filter(_ => !!_),
            defaultIfEmpty([])
        );
  }

  /**
   * Function to return one Groupe for current id
   */
  fetchOne(id: string): Observable<Groupe> {
    return this._http.get<Groupe>(this._backendURL.oneGroupe.replace(':id', id));
  }

  /**
   * Function to create a new Groupe
   */
  create(groupe: Groupe): Observable<any> {
    return this._http.post<Groupe>(this._backendURL.allGroupes, groupe, this._options());
  }

  /**
   * Function to delete one Groupe for current id
   */
  delete(id: number): Observable<number> {
    return this._http.delete(this._backendURL.oneGroupe.replace(':id', id))
        .pipe(
            map(_ => id)
        );
  }

  /**
   * Function to update one Groupe
   */
  update(groupe: Groupe): Observable<any> {
    return this._http.put<Groupe>(this._backendURL.oneGroupe.replace(':id', groupe.id), groupe, this._options());
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
