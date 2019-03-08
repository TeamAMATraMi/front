import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {Formateur} from '../interfaces/formateur';

@Injectable({
    providedIn: 'root'
})
export class FormateursService {

    private readonly _backendURL: any;

    constructor(private _http: HttpClient) {
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }
        // build all backend urls
        Object.keys(environment.backend.endpoints.formateurs)
            .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.formateurs[ k ]}`);
    }

    /**
     * Function to return all Apprenants
     */
    fetch(): Observable<Formateur []> {
        return this._http.get<Formateur[]>(this._backendURL.allFormateurs)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    fetchBySite(id: number): Observable<Formateur []> {
        return this._http.get<Formateur[]>(this._backendURL.siteFormateur.replace(':id', id))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    /**
     * Function to return one Apprenant for current id
     */
    fetchOne(id: string): Observable<Formateur> {
        return this._http.get<Formateur>(this._backendURL.oneFormateur.replace(':id', id));
    }

    /**
     * Function to return if a formateur exist
     */
    exist(nom: string, prenom: string): Observable<boolean> {
        return this._http.get<boolean>(this._backendURL.existFormateur.replace(':nom', nom).replace( ':prenom', prenom));
    }

    /**
     * Function to create a new Apprenant
     */
    create(formateur: Formateur): Observable<any> {
        return this._http.post<Formateur>(this._backendURL.allFormateurs, formateur, this._options());
    }

    /**
     * Function to delete one Apprenant for current id
     */
    delete(id: number): Observable<number> {
        return this._http.delete(this._backendURL.oneFormateur.replace(':id', id))
            .pipe(
                map(_ => id)
            );
    }

    /**
     * Function to update-apprenant one Apprenant
     */
    update(formateur: Formateur): Observable<any> {
        return this._http.put<Formateur>(this._backendURL.oneFormateur.replace(':id', formateur.id), formateur, this._options());
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
