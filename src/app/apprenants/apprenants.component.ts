import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {Router} from '@angular/router';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {GroupesService} from '../shared/services/groupes.service';
import {Groupe} from '../shared/interfaces/groupe';
import {DialogComponent} from '../shared/dialogs/apprenant-dialog/dialog.component';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {filter, flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {

  private _apprenants: Apprenant[];
  private _apprenantsTemp: Apprenant[];
  private _apprenant: Apprenant;
  private _sites: Site[];
  private  _groupes: Groupe[];
  private _site: Site;
  private _groupesSite: Groupe[];
  private _groupeTemp: Groupe;
  private _selectedSiteId: number | string;
  private _selectedGroupeId: number | string;

  private _dialogStatus: string;
  private _apprenantsDialog: MatDialogRef<DialogComponent>;

  private readonly _delete$: EventEmitter<Apprenant>;

  private _displayedColumns = ['NomPrenom', 'DateNaissance', 'PaysOrigine', 'Delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _dataSource: MatTableDataSource<Apprenant>;


  constructor(private _router: Router, private _apprenantsService: ApprenantsService, private _sitesService: SitesService,
              private _groupesService: GroupesService, private _dialog: MatDialog) {
    this._apprenants = [];
    this._apprenantsTemp = [];
    this._sites = [];
    this._groupes = [];
    this._groupesSite = [];

    this._dialogStatus = 'inactive';
    this._selectedSiteId = 'allSites';
    this._selectedGroupeId = 'allGroupes';
  }


  ngOnInit() {
    // TODO : fetch with associated service
    this._apprenantsService.fetch().subscribe((apprenants: Apprenant[]) => {
      this._apprenants = apprenants;
      this._apprenantsTemp = apprenants;
      this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
      this._dataSource.paginator = this.paginator;
    });
    this._sitesService.fetch().subscribe((sites: Site[]) => this._sites = sites);
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => { this._groupes = groupes; this._groupesSite = this._groupes; });
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
    this._apprenants = this._apprenantsTemp;
    this._apprenants = this._apprenants.filter(e => {
      this._groupes.forEach(g => {
        if (g.id === e.idGroupe) {
          this._groupeTemp = g;
        }
      });
      return this._groupeTemp.idSite === site.id;
    });
    this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
    this._dataSource.paginator = this.paginator;
    this._dataSource.paginator.firstPage();
  }

  afficherApprenants() {
    // On récupère le site ayant pour ville this._selectedSite
    /* var siteTemps;
    this._sites.forEach(s => {
      if (s.ville === this._selectedSite) {
        siteTemp = s;
      }
    })*/
    console.log('site : ' + this._selectedSiteId);
    console.log('groupe : ' + this._selectedGroupeId);
    if ((this._selectedSiteId === 'allSites') && (this._selectedGroupeId === 'allGroupes')) {
      console.log('test premier if');
      this._apprenants = this._apprenantsTemp;
    } else {
      if (this._selectedGroupeId === 'allGroupes') {
        /* this._sites.forEach(s => {
          if (s.id === this._selectedSiteId) {
            this._site = s;
          }
        });*/
        console.log('test deuxieme if');
        this._groupesSite = [];
        this._groupes.forEach(e => {
              if (e.idSite === this._selectedSiteId) {
                this._groupesSite.push(e);
              }
            }
        );
        console.log('taille : ' + this._groupesSite.length);
        this._apprenants = this._apprenantsTemp;
        this._apprenants = this._apprenants.filter(e => {
          this._groupes.forEach(g => {
            if (g.id === e.idGroupe) {
              this._groupeTemp = g;
            }
          });
          return this._groupeTemp.idSite === this._selectedSiteId;
        });
      } else {
        console.log('test troisieme if');
        this._apprenants = this._apprenantsTemp;
        this._apprenants = this._apprenants.filter(e => {
          this._groupes.forEach(g => {
            if (g.id === e.idGroupe) {
              this._groupeTemp = g;
            }
          });
          return this._groupeTemp.id === this._selectedGroupeId;
        });
      }
    }
    this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
    this._dataSource.paginator = this.paginator;
    this._dataSource.paginator.firstPage();
  }

  changerApprenants(groupe: Groupe) {
    this._apprenants = this._apprenantsTemp;
    this._apprenants = this._apprenants.filter(e => e.idGroupe === groupe.id);
    this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
    this._dataSource.paginator = this.paginator;
    this._dataSource.paginator.firstPage();
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  get groupesSites(): Groupe[] {
    return this._groupesSite;
  }

  set groupesSites(groupe: Groupe[]) {
    this._groupesSite = groupe;
    this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
    this._dataSource.paginator = this.paginator;
  }

  @Input()
  set apprenant(apprenant: Apprenant) {
    this._apprenant = apprenant;
  }

  @Output('deleteApprenant')
  get delete$(): EventEmitter<Apprenant> {
    return this._delete$;
  }

  delete(id: number) {
    this._apprenantsService.delete(id).subscribe(null, null, () => this.ngOnInit());
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
            (apprenants: Apprenant[]) => {
              this._apprenants = apprenants;
              this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
              this._dataSource.paginator = this.paginator;
            },
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

  get displayedColumns(): any {
    return this._displayedColumns;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this._dataSource.filter = filterValue;
    this._dataSource.paginator.firstPage();
  }

  get dataSource(): MatTableDataSource<Apprenant> {
    return this._dataSource;
  }

  get selectedSiteId(): number | string {
    return this._selectedSiteId;
  }

  set selectedSiteId(value: number | string) {
    this._selectedSiteId = value;
  }

  get selectedGroupeId(): number | string {
    return this._selectedGroupeId;
  }

  set selectedGroupeId(value: number | string) {
    this._selectedGroupeId = value;
  }
}
