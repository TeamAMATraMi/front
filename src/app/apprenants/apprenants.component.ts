import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {Router} from '@angular/router';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {GroupesService} from '../shared/services/groupes.service';
import {Groupe} from '../shared/interfaces/groupe';
import {DialogComponent} from '../shared/dialogs/apprenant-dialog/dialog.component';
import {MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort} from '@angular/material';
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
  private _groupesSite: Groupe[];
  private _groupeTemp: Groupe;
  private _selectedSiteId: number | string;
  private _selectedGroupeId: number | string;

  private _dialogStatus: string;
  private _apprenantsDialog: MatDialogRef<DialogComponent>;

  private readonly _delete$: EventEmitter<Apprenant>;

  private _displayedColumns = ['NomPrenom', 'DateNaissance', 'PaysOrigine', 'Delete'];
  private _dataSource: MatTableDataSource<Apprenant>;
  _valueForSearch = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, private _apprenantsService: ApprenantsService, private _sitesService: SitesService,
              private _groupesService: GroupesService, private _dialog: MatDialog, private snackBar: MatSnackBar) {
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
    this._apprenantsService.fetch().subscribe((apprenants) => {
      this._dataSource = new MatTableDataSource<Apprenant>(apprenants);
      this._apprenants = apprenants;
      this._apprenantsTemp = apprenants;
      this._dataSource.paginator = this.paginator;
      this._dataSource.sort = this.sort;
      this._dataSource.filterPredicate = (data: {nom: string, prenom: string}, filterValue: string) => {
        if ((data.nom.trim().toLowerCase().indexOf(filterValue) !== -1) || (data.prenom.trim().toLowerCase().indexOf(filterValue) !== -1)) {
          return true;
        } else {
          return false;
        }
      };
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

  afficherApprenants() {
    this._groupesSite = [];
    this._groupes.forEach(e => {
      if (this._selectedSiteId === 'allSites') {
        this._groupesSite.push(e);
      } else {
        if (e.idSite === this._selectedSiteId) {
          this._groupesSite.push(e);
        }
      }
    });
    // On affiche tous les apprenants
    if ((this._selectedSiteId === 'allSites') && (this._selectedGroupeId === 'allGroupes')) {
      this._apprenants = this._apprenantsTemp;
    } else {
      // On affiche tous les apprenants spécifiques à un site
      if (this._selectedGroupeId === 'allGroupes') {
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
        // On affiche tous les apprenants spécifiques à un groupe
        this._apprenants = this._apprenantsTemp;
        this._apprenants = this._apprenants.filter(e => {
          return e.idGroupe === this._selectedGroupeId;
        });
      }
    }
    this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
    this._dataSource.paginator = this.paginator;
    this._dataSource.paginator.firstPage();
    this._dataSource.filterPredicate = (data: {nom: string}, filterValue: string) =>
        data.nom.trim().toLowerCase().indexOf(filterValue) !== -1;
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
    this._dataSource.filterPredicate = (data: {nom: string}, filterValue: string) =>
        data.nom.trim().toLowerCase().indexOf(filterValue) !== -1;
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
      width: '1000px',
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
              this._dataSource.filterPredicate = (data: {nom: string}, filterValue: string) =>
                  data.nom.trim().toLowerCase().indexOf(filterValue) !== -1;
            },
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  private _add(apprenant: Apprenant): Observable<Apprenant[]> {
    this.addOpenSnackBar();
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
  deleteConfirmation(id: number) {
    if (confirm('Voulez vous vraiment supprimer cet apprenant ?')) {
      this.delete(id);
      this.deleteOpenSnackBar();
    }
  }

  get valueForSearch(): string {
    return this._valueForSearch;
  }

  sortData(sort: Sort) {
    const data = this._dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this._dataSource.data = data;
      return;
    }
    this._dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'NomPrenom': return compare(a.nom, b.nom, isAsc);
        case 'PaysOrigine': return compare(a.paysOrigine, b.paysOrigine, isAsc);
        default: return 0;
      }
    });
  }

  addOpenSnackBar() {
    this.snackBar.open('Ajout effectué avec succés', 'OK', {
      duration: 3000
    });
  }

  deleteOpenSnackBar() {
    this.snackBar.open('suppression effectué', 'OK', {
      duration: 3000
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
