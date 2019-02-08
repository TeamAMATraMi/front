import {Component, Input, OnInit} from '@angular/core';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {Router} from '@angular/router';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {GroupesService} from '../shared/services/groupes.service';
import {Groupe} from '../shared/interfaces/groupe';
import {DialogComponent} from '../shared/dialogs/apprenant-dialog/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {filter, flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {

  private _apprenants: Apprenant[];
  private _sites: Site[];
  private  _groupes: Groupe[];
  private _site: Site;
  private _groupesSite: Groupe[];

  private _dialogStatus: string;
  private _apprenantsDialog: MatDialogRef<DialogComponent>;

  private _searchText: string;

  constructor(private _router: Router, private _apprenantsService: ApprenantsService, private _sitesService: SitesService,
              private _groupesService: GroupesService, private _dialog: MatDialog) {
    this._apprenants = [];
    this._sites = [];
    this._groupes = [];
    this._groupesSite = [];

    this._dialogStatus = 'inactive';
  }

  get searchText(): string {
    return this._searchText;
    console.log('GET ' + this._searchText);
  }

  set searchText(s: string) {
    this._searchText = s;
    console.log('SET ' + this._searchText);
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  get apprenants(): Apprenant[] {
    return this._apprenants;
  }

  get sites(): Site[] {
    return this._sites;
  }

  setSite(site: Site) {
    this._site = site;
    this._groupesSite = [];
    this._groupes.forEach(e => {
          if (e.idSite === this._site.id) {
            this._groupesSite.push(e);
          }
        }
    );
  }

  changeApprenants(groupe: Groupe) {
    this._apprenantsService.fetchByGroup(groupe.id).subscribe((apprenants: Apprenant[]) => this._apprenants = apprenants);
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  get groupesSites(): Groupe[] {
    return this._groupesSite;
  }

  set groupesSites(groupe: Groupe[]) {
    this._groupesSite = groupe;
  }


  delete(apprenant: Apprenant) {
    this._apprenantsService
        .delete(apprenant.id)
        .subscribe(_ => this._apprenants = this._apprenants.filter(__ => __.id !== _));
  }

  ngOnInit() {
      // TODO : fetch with associated service
    this._apprenantsService.fetch().subscribe((apprenants: Apprenant[]) => this._apprenants = apprenants);
    this._sitesService.fetch().subscribe((sites: Site[]) => this._sites = sites);
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => { this._groupes = groupes; this._groupesSite = this._groupes; });
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set apprenant-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._apprenantsDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._apprenantsDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (apprenants: Apprenant[]) => this._apprenants = apprenants,
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  private _add(apprenant: Apprenant): Observable<Apprenant[]> {
    return this._apprenantsService
        .create(apprenant)
        .pipe(
            flatMap(_ => this._apprenantsService.fetch())
        );
  }

}
