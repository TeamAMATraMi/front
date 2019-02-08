import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CoursService} from '../shared/services/cours.service';
import {Cours} from '../shared/interfaces/cours';
import {Observable} from 'rxjs';
import {filter, flatMap} from 'rxjs/operators';
import {FormateurDialogComponent} from '../shared/dialogs/formateur-dialog/formateur-dialog.component';
import {Formateur} from '../shared/interfaces/formateur';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CoursDialogComponent} from '../shared/dialogs/cours-dialog/cours-dialog.component';
import {FormateursService} from '../shared/services/formateurs.service';
import {SitesService} from '../shared/services/sites.service';
import {GroupesService} from '../shared/services/groupes.service';
import {Groupe} from '../shared/interfaces/groupe';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  private _cours: Cours[];
  private _dialogStatus: string;
  private _coursDialog: MatDialogRef<CoursDialogComponent>;
  private _formateurs: Formateur[];
  private _groupes: Groupe[];

  constructor(private _router: Router, private _coursService: CoursService, private _formateursService: FormateursService,
              private _groupesService: GroupesService, private _dialog: MatDialog) {
    this._cours = [];
    this._formateurs = [];
    this._dialogStatus = 'inactive';
    this._groupes = [];
  }

  ngOnInit() {
    this._coursService.fetch().subscribe((cours: Cours[]) =>
      this._cours = cours);
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

  set dialogStatus(value: string) {
    this._dialogStatus = value;
  }

  get coursDialog(): MatDialogRef<CoursDialogComponent> {
    return this._coursDialog;
  }

  set coursDialog(value: MatDialogRef<CoursDialogComponent>) {
    this._coursDialog = value;
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

  private _add(cour: Cours): Observable<Cours[]> {
    return this._coursService
      .create(cour)
      .pipe(
        flatMap(_ => this._coursService.fetch())
      );
  }

  delete(cour: Cours) {
    this._coursService
      .delete(cour.id)
      .subscribe(_ => {
        return this._cours = this._cours.filter(__ => __.id !== _);
      });
  }

  showDialog() {
    // set apprenant-dialogs status
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
            (cours: Cours[]) => this.cours = cours,
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }
}
