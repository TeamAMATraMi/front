import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {Apprenant} from '../interfaces/apprenant';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApprenantsService {

    private readonly _backendURL: any;

    constructor(private _http: HttpClient) {
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }
        // build all backend urls
        Object.keys(environment.backend.endpoints.apprenants)
            .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.apprenants[ k ]}`);
    }

    /**
     * Function to return all Apprenants
     */
    fetch(): Observable<Apprenant []> {
        return this._http.get<Apprenant[]>(this._backendURL.allApprenants)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    /**
     * Function to return one Apprenant for current id
     */
    fetchOne(id: string): Observable<Apprenant> {
        return this._http.get<Apprenant>(this._backendURL.oneApprenant.replace(':id', id));
    }

    /**
     * Function to return all Apprenants corresponding to idgroup
     */
    fetchByGroup(idgroupe: string): Observable<Apprenant[]> {
        return this._http.get<Apprenant[]>(this._backendURL.grpApprenant.replace(':idgroupe', idgroupe))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    /**
     * Function to create a new Apprenant
     */
    create(apprenant: Apprenant): Observable<any> {
        return this._http.post<Apprenant>(this._backendURL.allApprenants, apprenant, this._options());
    }

    /**
     * Function to delete one Apprenant for current id
     */
    delete(id: number): Observable<number> {
        return this._http.delete(this._backendURL.oneApprenant.replace(':id', id))
            .pipe(
                map(_ => id)
            );
    }

    /**
     * Function to update one Apprenant
     */
    update(apprenant: Apprenant): Observable<any> {
        return this._http.put<Apprenant>(this._backendURL.oneApprenant.replace(':id', apprenant.id), apprenant, this._options());
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
