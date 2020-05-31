import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {Site} from '../interfaces/site';

@Injectable({
    providedIn: 'root'
})
export class SitesService {

    private readonly _backendURL: any;

    constructor(private _http: HttpClient) {
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }
        // build all backend urls
        Object.keys(environment.backend.endpoints.sites)
            .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.sites[ k ]}`);
    }

    /**
     * Function to return all Sites
     */
    fetch(): Observable<Site[]> {
        return this._http.get<Site[]>(this._backendURL.allSites)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    /**
     * Function to return one Site for current id
     */
    fetchOne(id: number): Observable<Site> {
        return this._http.get<Site>(this._backendURL.oneSite.replace(':id', id));
    }

    /**
     * Function to create a new Site
     */
    create(site: Site): Observable<any> {
        return this._http.post<Site>(this._backendURL.allSites, site, this._options());
    }

/**
     * Function to return if a site exist
     */
    exist(ville: string): Observable<boolean> {
        return this._http.get<boolean>(this._backendURL.siteExist.replace(':ville', ville));
    }

    /**
     * Function to delete one Site for current id
     */
    delete(id: number): Observable<number> {
        return this._http.delete(this._backendURL.oneSite.replace(':id', id))
            .pipe(
                map(_ => id)
            );
    }
     /**
         * Function get site id by ville
         */

    getIdByVille(ville: string): Observable<number> {
        return this._http.get<number>(this._backendURL.siteByVille.replace(':ville', ville));
     }

    /**
     * Function to update-apprenant one Site
     */
    update(site: Site): Observable<any> {
        return this._http.put<Site>(this._backendURL.oneSite.replace(':id', site.id), site, this._options());
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
