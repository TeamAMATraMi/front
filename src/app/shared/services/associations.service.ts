import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Association} from '../interfaces/association';
import {Observable} from 'rxjs';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssociationsService {

  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    Object.keys(environment.backend.endpoints.associations)
        .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.associations[ k ]}`);
  }

  fetch(): Observable<Association[]> {
    return this._http.get<Association[]>(this._backendURL.allAssociations)
        .pipe(
            filter(_ => !!_),
            defaultIfEmpty([])
        );
  }

  fetchOne(id: string): Observable<Association> {
    return this._http.get<Association>(this._backendURL.oneAssociation.replace(':id', id));
  }

  create(association: Association): Observable<any> {
    return this._http.post<Association>(this._backendURL.allAssociations, association, this._options());
  }

  delete(id: number): Observable<number> {
    return this._http.delete(this._backendURL.oneAssociation.replace(':id', id))
        .pipe(
            map(_ => id)
        );
  }

  update(association: Association): Observable<any> {
    return this._http.put<Association>(this._backendURL.allAssociations, association, this._options());
  }

  private _options(headerList: Object = {}): any {
    return { headers: new HttpHeaders(Object.assign({
        'Content-Type': 'application/json'
      }, headerList)) };
  }
}
