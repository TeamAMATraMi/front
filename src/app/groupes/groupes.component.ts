import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {GroupesService} from '../shared/services/groupes.service';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {GroupeDialogComponent} from '../shared/dialogs/groupe-dialog/groupe-dialog.component';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {Apprenant} from '../shared/interfaces/apprenant';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent implements OnInit {

  private _displayedColumns = ['Nom', 'Site', 'Nombre', 'Delete'];
  private _groupes: Groupe[];
  private _apprenants: Apprenant[];
  private _groupesTemp: Groupe[];
  private _dialogStatus: string;
  private _groupesDialog: MatDialogRef<GroupeDialogComponent>;
  private readonly _delete$: EventEmitter<Groupe>;
  private _sites: Site[];
  private tmp: string;
  private tmpInt: number;
  private _selectedSiteId: number | string;
  private  value = '';

  private _dataSource: MatTableDataSource<Groupe>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _router: Router, private _groupesService: GroupesService,
              private _dialog: MatDialog, private _sitesService: SitesService, private snackBar: MatSnackBar,
              private _apprenantsServices: ApprenantsService) {
    this._groupes = [];
    this._apprenants = [];
    this._groupesTemp = [];
    this._dialogStatus = 'inactive';
    this._sites = [];
    this._selectedSiteId = 'allSites';
  }

  get sites(): Site[] {
    return this._sites;
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  ngOnInit() {
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => {
      this._groupes = groupes;
      this._groupesTemp = groupes;
      this._dataSource = new MatTableDataSource<Groupe>(this._groupes);
      this._dataSource.paginator = this.paginator;
      this._dataSource.filterPredicate = (data: {nom: string}, filterValue: string) =>
          data.nom.trim().toLowerCase().indexOf(filterValue) !== -1;
    });
    this._sitesService.fetch().subscribe((sites: Site[]) => { this._sites = sites; });
    this._apprenantsServices.fetch().subscribe((app: Apprenant[]) => {
        this._apprenants = app;
    });
  }

  getVilleByIdGroup(id: number): string {
    this.tmp = 'default';
    this._sites.forEach(s => {
      if (s.id === id) {
        this.tmp = s.ville;
      }
    });
    return this.tmp;
  }

  getNombreByIdGroup(id: number): number {
      this.tmpInt = 0;
      this._apprenants.forEach(s => {
          if (s.idGroupe === id) {
              this.tmpInt++;
          }
      });
      return this.tmpInt;
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set apprenant-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._groupesDialog = this._dialog.open(GroupeDialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._groupesDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (groupes: Groupe[]) => {
              this._groupes = groupes;
              this._dataSource = new MatTableDataSource<Groupe>(this._groupes);
              this._dataSource.paginator = this.paginator;
            },
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  private _add(groupe: Groupe): Observable<Groupe[]> {
    this.addOpenSnackBar();
    return this._groupesService
        .create(groupe)
        .pipe(
            flatMap(_ => this._groupesService.fetch())
        );
  }

  @Output('deleteGroupe')
  get delete$(): EventEmitter<Groupe> {
    return this._delete$;
  }

  delete(id: number) {
    this._groupesService.delete(id).subscribe(null, null, () => this.ngOnInit());
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  set groupes(value: Groupe[]) {
    this._groupes = value;
  }

  get dataSource(): MatTableDataSource<Groupe> {
    return this._dataSource;
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }

  afficherGroupes() {
    if (this._selectedSiteId === 'allSites') {
      this._groupes = this._groupesTemp;
    } else {
      this._groupes = this._groupesTemp;
      this._groupes = this._groupes.filter(e => e.idSite === this._selectedSiteId);
    }
    this._dataSource = new MatTableDataSource<Groupe>(this._groupes);
    this._dataSource.paginator = this.paginator;
    this._dataSource.filterPredicate = (data: {nom: string}, filterValue: string) =>
        data.nom.trim().toLowerCase().indexOf(filterValue) !== -1;
    this._dataSource.paginator.firstPage();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this._dataSource.filter = filterValue;
    this._dataSource.paginator.firstPage();
  }

  deleteConfirmation(id: number) {
    if (confirm('Voulez vous vraiment supprimer ce groupe ?')) {
      this.delete(id);
      this.deleteOpenSnackBar();
    }
  }

  clear(id: number) {
    this._groupesService.clear(id).subscribe(null, null, () => this.ngOnInit());
  }

  clearConfirmation(id: number) {
    if (confirm('Voulez vous vraiment vider ce groupe ?')) {
      this.clear(id);
      this.clearOpenSnackBar();
    }
  }

  get selectedSiteId(): number | string {
    return this._selectedSiteId;
  }

  set selectedSiteId(value: number | string) {
    this._selectedSiteId = value;
  }

  addOpenSnackBar() {
    this.snackBar.open('ajout effectué', 'OK', {
      duration: 3000
    });
  }

  deleteOpenSnackBar() {
    this.snackBar.open('suppression effectué', 'OK', {
      duration: 3000
    });
  }

  clearOpenSnackBar() {
    this.snackBar.open('nettoyage effectué', 'OK', {
      duration: 3000
    });
  }
}
