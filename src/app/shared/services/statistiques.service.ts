import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {defaultIfEmpty, filter} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StatistiquesService {

    private readonly _backendURL: any;

    constructor(private _http: HttpClient) {
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }
        // build all backend urls
        Object.keys(environment.backend.endpoints.statistiques)
            .forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints.statistiques[ k ]}`);
    }

    /**
     * Function to get statistiques by sexe
     */
    fetchBySexe(site: string,dateDebut:number,dateFin:number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.sexeStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchByAge(site: string,dateDebut:number,dateFin:number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.ageStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchBySite(site: string,dateDebut:number,dateFin:number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.siteStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchByNationalite(site: string,dateDebut:number,dateFin:number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.nationaliteStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchBySejour(site: string,dateDebut:number,dateFin:number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.titreSejourStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

	fetchByPresences(site: number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.presencesStatistiques.replace(':nom', site))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchByQuartierPrio(site: string,dateDebut:number,dateFin:number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.quartierPrioStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchByNiveauScol(site: string,dateDebut:number,dateFin:number): Observable<Map<number, number>> {
        return this._http.get<Map<number, number>>(this._backendURL.niveauScolStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchByStatutPro(site: string,dateDebut:number,dateFin:number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.statutProStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchByPriseCharge(site: string,dateDebut:number,dateFin:number): Observable<Map<number, number>> {
        return this._http.get<Map<number, number>>(this._backendURL.priseChargeStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchByNiveauLangue(site: string,dateDebut:number,dateFin:number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.niveauLangueStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }

    fetchByPrimoArrivant(site: string,dateDebut:number,dateFin:number): Observable<Map<String, number>> {
        return this._http.get<Map<String, number>>(this._backendURL.primoArrivantStatistiques.replace(':nom', site).replace(':dateDebut', dateDebut).replace(':dateFin', dateFin))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty(null)
            );
    }
}
