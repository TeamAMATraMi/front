import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Formateur} from '../shared/interfaces/formateur';
import {Router} from '@angular/router';
import {FormateursService} from '../shared/services/formateurs.service';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {filter, flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Groupe} from '../shared/interfaces/groupe';
import {GroupesService} from '../shared/services/groupes.service';
import {FormateurDialogComponent} from '../shared/dialogs/formateur-dialog/formateur-dialog.component';

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.css']
})
export class FormateursComponent implements OnInit {

  private _displayedColumns = ['NomPrenom', 'Tel', 'Adresse', 'Delete'];

  private _formateur: Formateur;
  private readonly _delete$: EventEmitter<Formateur>;

  private _formateurs: Formateur[];
  private _formateursTemp: Formateur[];
  private _sites: Site[];
  private _site: Site;
  private _groupesSite: Groupe[];
  private _groupes: Groupe[];
  private _selectedSiteId: number | string;

  private _dialogStatus: string;
  private _formateursDialog: MatDialogRef<FormateurDialogComponent>;
  dataSource: MatTableDataSource<Formateur>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, private _formateursService: FormateursService, private _sitesService: SitesService,
              private _dialog: MatDialog, private _groupesService: GroupesService) {
    this._formateurs = [];
    this._formateursTemp = [];
    this._sites = [];
    this._dialogStatus = 'inactive';
    this._groupesSite = [];
    this._groupes = [];
    this._selectedSiteId = 'allSites';
  }

  ngOnInit() {
    // TODO : fetch with associated service formateur
    this._formateursService.fetch().subscribe(_formateur => {
      this.dataSource = new MatTableDataSource<Formateur>(_formateur);
      this._formateurs = _formateur;
      this._formateursTemp = _formateur;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this._sitesService.fetch().subscribe((sites: Site[]) => this._sites = sites);
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => { this._groupes = groupes; this._groupesSite = this._groupes; });
  }

  get formateurs(): Formateur[] {
    return this._formateurs;
  }

  get sites(): Site[] {
    return this._sites;
  }

  set sites(value: Site[]) {
    this._sites = value;
  }

  get site(): Site {
    return this._site;
  }

  set site(value: Site) {
    this._site = value;
  }

  afficherFormateurs() {
    if (this._selectedSiteId === 'allSites') {
      this._formateurs = this._formateursTemp;
    } else {
      this._formateurs = this._formateursTemp;
      this._formateurs = this._formateurs.filter(e => e.idSite === this._selectedSiteId);
    }
    this.dataSource = new MatTableDataSource<Formateur>(this._formateurs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.firstPage();
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  showDialog() {
    // set formateur-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._formateursDialog = this._dialog.open(FormateurDialogComponent, {
      width: '800px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._formateursDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (formateurs: Formateur[]) => {
              this._formateurs = formateurs;
              this.dataSource.paginator = this.paginator;
            },
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  set groupes(value: Groupe[]) {
    this._groupes = value;
  }

  private _add(formateur: Formateur): Observable<Formateur[]> {
    return this._formateursService
        .create(formateur)
        .pipe(
            flatMap(_ => this._formateursService.fetch())
        );
  }

  @Input()
  set formateur(value: Formateur) {
    this._formateur = value;
  }

  @Output('deleteFormateur')
  get delete$(): EventEmitter<Formateur> {
    return this._delete$;
  }

  delete(id: number) {
    this._formateursService.delete(id).subscribe(null, null, () => this.ngOnInit());
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSource.paginator.firstPage();
  }

  deleteConfirmation(id: number) {
    if (confirm('Voulez vous vraiment supprimer ce formateur ?')) {
      this.delete(id);
    }
  }

  get selectedSiteId(): number | string {
    return this._selectedSiteId;
  }

  set selectedSiteId(value: number | string) {
    this._selectedSiteId = value;
  }

 sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'NomPrenom': return compare(a.nom, b.nom, isAsc);
        case 'Tel': return compare(a.telephone, b.telephone, isAsc);
        case 'Adresse': return compare(a.adresse, b.adresse, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
