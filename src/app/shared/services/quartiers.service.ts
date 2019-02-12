import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {QuartierPrioritaire} from '../interfaces/quartier_prioritaire';

@Injectable({
  providedIn: 'root'
})
export class QuartiersService {

  private readonly _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }
    // build all backend urls
    Object.keys(environment.backend.endpoints.quartiers)
        .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.quartiers[ k ]}`);
  }

  fetch(): Observable<QuartierPrioritaire[]> {
    return this._http.get<QuartierPrioritaire[]>(this._backendURL.allQuartiers)
        .pipe(
            filter(_ => !!_),
            defaultIfEmpty([])
        );
  }

  fetchOne(id: string): Observable<QuartierPrioritaire> {
    return this._http.get<QuartierPrioritaire>(this._backendURL.oneQuartier.replace(':id', id));
  }

  create(quartier: QuartierPrioritaire): Observable<any> {
    return this._http.post<QuartierPrioritaire>(this._backendURL.allQuartiers, quartier, this._options());
  }

  delete(id: number): Observable<number> {
    return this._http.delete(this._backendURL.oneQuartier.replace(':id', id))
        .pipe(
            map(_ => id)
        );
  }

  update(quartier: QuartierPrioritaire): Observable<any> {
    return this._http.put<QuartierPrioritaire>(this._backendURL.allQuartiers, quartier, this._options());
  }

  private _options(headerList: Object = {}): any {
    return { headers: new HttpHeaders(Object.assign({
        'Content-Type': 'application/json'
      }, headerList)) };
  }
}
