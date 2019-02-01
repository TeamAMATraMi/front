import { Component, OnInit } from '@angular/core';
import {Formateur} from '../shared/interfaces/formateur';
import {Router} from '@angular/router';
import {FormateursService} from '../shared/services/formateurs.service';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {filter, flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.css']
})
export class FormateursComponent implements OnInit {

  private _formateurs: Formateur[];
  private _dialogStatus: string;
  private _formateursDialog: MatDialogRef<DialogComponent>;

  constructor(private _router: Router, private formateurService: FormateursService, private _dialog: MatDialog,
              private _formateurService : FormateursService) {
    this._formateurs = [];

    this._dialogStatus = 'inactive';
  }

  ngOnInit() {
    // TODO : fetch with associated service formateur
    this.formateurService.fetch().subscribe((formateur: Formateur[]) => this._formateurs = formateur);
  }

  navigate(formateur: Formateur) {
    this._router.navigate(['/formateur', formateur.id]);
  }

  get formateurs(): Formateur[] {
    return this._formateurs;
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._formateursDialog = this._dialog.open(DialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._formateursDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        flatMap(_ => this._add(_))
      )
      .subscribe(
        (formateurs: Formateur[]) => this._formateurs = formateurs,
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  private _add(formateur: Formateur): Observable<Formateur[]> {
    return this._formateurService
      .create(formateur)
      .pipe(
        flatMap(_ => this._formateurService.fetch())
      );
  }
}
