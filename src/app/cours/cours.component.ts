import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {CoursService} from '../shared/services/cours.service';
import {Cours} from '../shared/interfaces/cours';
import {Observable} from 'rxjs';
import {filter, flatMap} from 'rxjs/operators';
import {Formateur} from '../shared/interfaces/formateur';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {CoursDialogComponent} from '../shared/dialogs/cours-dialog/cours-dialog.component';
import {FormateursService} from '../shared/services/formateurs.service';
import {GroupesService} from '../shared/services/groupes.service';
import {Groupe} from '../shared/interfaces/groupe';
import {PresencesService} from '../shared/services/presences.service';
import {ApprenantsService} from '../shared/services/apprenants.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  private _displayedColumns = ['matiere', 'formateur', 'horaire', 'Delete'];

  private _cours: Cours[];
  private _dialogStatus: string;
  private _coursDialog: MatDialogRef<CoursDialogComponent>;
  private _formateurs: Formateur[];
  private _groupes: Groupe[];

  private readonly _delete$: EventEmitter<Cours>;
  private _formateur: Formateur; // Variable temporaire

  private _dataSource: MatTableDataSource<Cours>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _router: Router, private _coursService: CoursService, private _formateursService: FormateursService,
              private _groupesService: GroupesService, private _presencesService: PresencesService,
              private _apprenantsService: ApprenantsService, private _dialog: MatDialog) {
    this._cours = [];
    this._formateurs = [];
    this._dialogStatus = 'inactive';
    this._groupes = [];
  }

  ngOnInit() {
    this._coursService.fetch().subscribe((cours: Cours[]) => {
      this._cours = cours;
      this._dataSource = new MatTableDataSource<Cours>(this._cours);
      this._dataSource.paginator = this.paginator;
      this._dataSource.filterPredicate = (data: {matiere: string}, filterValue: string) =>
          data.matiere.trim().toLowerCase().indexOf(filterValue) !== -1;
    });
    this._formateursService.fetch().subscribe((formateurs: Formateur[]) => this._formateurs = formateurs);
  }

  get dataSource(): MatTableDataSource<Cours> {
    return this._dataSource;
  }

  get cours(): Cours[] {
    return this._cours;
  }

  set cours(value: Cours[]) {
    this._cours = value;
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  get formateurs(): Formateur[] {
    return this._formateurs;
  }

  set formateurs(value: Formateur[]) {
    this._formateurs = value;
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  set groupes(value: Groupe[]) {
    this._groupes = value;
  }

  private _add(cours: Cours): Observable<Cours[]> {
    return this._coursService
      .create(cours)
      .pipe(
        flatMap(_ => this._coursService.fetch())
      );
  }

  @Output('deleteCours')
  get delete$(): EventEmitter<Cours> {
    return this._delete$;
  }

  delete(id: number) {
    this._coursService.delete(id).subscribe(null, null, () => this.ngOnInit());
  }

  showDialog() {
    // set cours-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._coursDialog = this._dialog.open(CoursDialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._coursDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (cours: Cours[]) => {
              this._cours = cours;
              this._dataSource = new MatTableDataSource<Cours>(this._cours);
              this._dataSource.paginator = this.paginator;
            },
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }

  getNomFormateur(id: number): string {
    this._formateurs.forEach(f => {
      if (f.id === id) {
        this._formateur = f;
      }
    });
    if (this._formateur !== undefined) {
      return this._formateur.nom;
    }
    return '';
  }

  getPrenomFormateur(id: number): string {
    this._formateurs.forEach(f => {
      if (f.id === id) {
        this._formateur = f;
      }
    });
    if (this._formateur !== undefined) {
      return this._formateur.prenom;
    }
    return '';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this._dataSource.filter = filterValue;
    this._dataSource.paginator.firstPage();
  }

  deleteConfirmation(id: number) {
    if (confirm('Voulez vous vraiment supprimer ce cours ?')) {
      this.delete(id);
    }
  }
}
