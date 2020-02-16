import {Component, OnInit, Output} from '@angular/core';
import {Cours} from '../shared/interfaces/cours';
import {ActivatedRoute, Params} from '@angular/router';
import {CoursService} from '../shared/services/cours.service';
import {filter, flatMap} from 'rxjs/operators';
import {CoursDialogComponent} from '../shared/dialogs/cours-dialog/cours-dialog.component';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {SeanceDialogComponent} from '../shared/dialogs/seance-dialog/seance-dialog.component';
import {Observable} from 'rxjs';
import {SeancesService} from '../shared/services/seances.service';
import {Seance} from '../shared/interfaces/seance';

@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrls: ['./cour.component.css']
})
export class CourComponent implements OnInit {

  private _cour: Cours;

  private _dialogStatus: string;

  private _seanceDialog: MatDialogRef<SeanceDialogComponent>;

  private _seances: Seance[];



  constructor(private _coursService: CoursService, private _seancesService: SeancesService, private _route: ActivatedRoute, private _dialog: MatDialog, private snackBar: MatSnackBar) {
    this._cour = {} as Cours;
    this._dialogStatus = 'inactive';
    this._seances = [];
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  ngOnInit() {
    this._route.params
        .subscribe(
            (params: Params) => {
              const id = +params['id'];
              this._coursService.fetchOne(id).subscribe((cours: Cours) => this._cour = cours);
            }
        );
  }

  get cours(): Cours {
    return this._cour;
  }

  modifier(cour: Cours) {
    this._coursService
      .update(cour)
      .subscribe( _ => this._cour = _);
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

  /**
   * Permet d'ajouter une seance dans un cours
   */
  private _add(seance: Seance): Observable<Cours> {
    seance.cours = this._cour;
    this.addOpenSnackBar();
    return this._coursService
        .addSeance(seance)
        .pipe(
            flatMap(_ => this._coursService.fetchOne(this._cour.id))
        );
  }

  showDialog() {
    // set cours-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._seanceDialog = this._dialog.open(SeanceDialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._seanceDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (cours: Cours) => {
              this._cour = cours;
            },
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

}
