import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Formateur} from '../interfaces/formateur';

@Component({
  selector: 'app-formateur-dialog',
  templateUrl: './formateur-dialog.component.html',
  styleUrls: ['./formateur-dialog.component.css']
})
export class FormateurDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<FormateurDialogComponent>, @Inject(MAT_DIALOG_DATA) private _formateur: Formateur) { }

  ngOnInit() {
  }

  get formateur(): Formateur {
    return this._formateur;
  }

  onCancel() {
    this._dialogRef.close();
  }

  onSave(formateur: Formateur) {
    this._dialogRef.close(formateur);
  }
}
