import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {Seance} from '../interfaces/seance';

@Injectable({
    providedIn: 'root'
})
export class SeancesService {

    private readonly _backendURL: any;

    constructor(private _http: HttpClient) {
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }
        // build all backend urls
        Object.keys(environment.backend.endpoints.seances)
            .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.seances[ k ]}`);
    }

    /**
     * Function to return all Seance
     */
    fetch(): Observable<Seance[]> {
        return this._http.get<Seance[]>(this._backendURL.allSeances)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    /**
     * Function to return all Seances for cours id
     */
    fetchFromCours(id: number): Observable<Seance[]> {
        return this._http.get<Seance[]>(this._backendURL.allSeancesByCours.replace(':id', id));
    }

    /**
     * Function to return one Seance for current id
     */
    fetchOne(id: number): Observable<Seance> {
        return this._http.get<Seance>(this._backendURL.oneSeance.replace(':id', id));
    }

    /**
     * Function to create a new Seance
     */
    create(seance: Seance): Observable<any> {
        return this._http.post<Seance>(this._backendURL.allSeances, seance, this._options());
    }

    /**
     * Function to delete one Seance for current id
     */
    delete(id: number): Observable<number> {
        return this._http.delete(this._backendURL.oneSeance.replace(':id', id))
            .pipe(
                map(_ =>  id)
            );
    }

    /**
     * Function to update-apprenant one Seance
     */
    update(seance: Seance): Observable<any> {
        return this._http.put<Seance>(this._backendURL.oneSeance.replace(':id', seance.id), seance, this._options());
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
