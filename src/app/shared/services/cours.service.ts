import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {Cours} from '../interfaces/cours';
import {Seance} from '../interfaces/seance';

@Injectable({
    providedIn: 'root'
})
export class CoursService {

    private readonly _backendURL: any;

    constructor(private _http: HttpClient) {
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }
        // build all backend urls
        Object.keys(environment.backend.endpoints.cours)
            .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.cours[ k ]}`);
    }

    /**
     * Function to return all Cours
     */
    fetch(): Observable<Cours[]> {
        return this._http.get<Cours[]>(this._backendURL.allCours)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    /**
     * Function to return all Cours for group id
     */
    fetchFromGroup(id: number): Observable<Cours[]> {
        return this._http.get<Cours[]>(this._backendURL.allCours)
            .pipe(
                filter(_ => !!_ ),
                map(_ => _.filter(__ => __.idGroupe == id)),
                defaultIfEmpty([])
            );
    }

    /**
     * Function to return one Cours for current id
     */
    fetchOne(id: number): Observable<Cours> {
        return this._http.get<Cours>(this._backendURL.oneCours.replace(':id', id));
    }

    /**
     * Function to create a new Cours
     */
    create(cours: Cours): Observable<any> {
        return this._http.post<Cours>(this._backendURL.allCours, cours, this._options());
    }

    /**
     * Function to delete one Cours for current id
     */
    delete(id: number): Observable<number> {
      return this._http.delete(this._backendURL.oneCours.replace(':id', id))
        .pipe(
          map(_ =>  id)
        );
    }

    /**
     * Function to update-apprenant one Cours
     */
    update(cours: Cours): Observable<any> {
        return this._http.put<Cours>(this._backendURL.oneCours.replace(':id', cours.id), cours, this._options());
    }

    /**
     * Function to return request options
     */
    private _options(headerList: Object = {}): any {
        return { headers: new HttpHeaders(Object.assign({
                'Content-Type': 'application/json'
            }, headerList)) };
    }

    /**
     * Fonction pour ajouter une seance dans un cours
     * @param seance
     */
    addSeance(seance: Seance): Observable<any> {
        return this._http.put<Seance>(this._backendURL.addSeance.replace(':id', seance.cours.id), seance, this._options());
    }
}
