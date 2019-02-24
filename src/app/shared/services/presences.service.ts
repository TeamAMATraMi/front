import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {Presence} from '../interfaces/presence';

@Injectable({
  providedIn: 'root'
})
export class PresencesService {

  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    Object.keys(environment.backend.endpoints.presences)
        .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.presences[ k ]}`);
  }

  /**
   * Function to return all Presences
   */
  fetch(): Observable<Presence[]> {
    return this._http.get<Presence[]>(this._backendURL.allPresences)
        .pipe(
            filter(_ => !!_),
            defaultIfEmpty([])
        );
  }

  /**
   * Function to return one Presence for current id
   */
  fetchOne(id: number): Observable<Presence> {
    return this._http.get<Presence>(this._backendURL.onePresence.replace(':id', id));
  }


  fetchByIdCours(id: number): Observable<Presence []> {
    return this._http.get<Presence[]>(this._backendURL.idCoursPresence.replace(':id', id))
        .pipe(
            filter(_ => !!_),
            defaultIfEmpty([])
        );
  }


  /**
   * Function to create a new Presence
   */
  create(presence: Presence): Observable<any> {
    return this._http.post<Presence>(this._backendURL.allPresences, presence, this._options());
  }

  /**
   * Function to delete one Presence for current id
   * Shall not be used
   */
  delete(id: number): Observable<number> {
    return this._http.delete(this._backendURL.onePresence.replace(':id', id))
        .pipe(
            map(_ => id)
        );
  }


  update(presences: Presence[]): Observable<any> {
    return this._http.put<Presence[]>(this._backendURL.fichePresences, presences, this._options());
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
