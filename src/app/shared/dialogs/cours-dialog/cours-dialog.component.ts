import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Cours} from '../../interfaces/cours';

@Component({
  selector: 'app-cours-dialog',
  templateUrl: './cours-dialog.component.html',
  styleUrls: ['./cours-dialog.component.css']
})
export class CoursDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<CoursDialogComponent>, @Inject(MAT_DIALOG_DATA) private _cours: Cours) { }

  ngOnInit() {
  }

  get cours(): Cours {
    return this._cours;
  }

  onCancel() {
    this._dialogRef.close();
  }

  onSave(cours: Cours) {
    this._dialogRef.close(cours);
  }
}
