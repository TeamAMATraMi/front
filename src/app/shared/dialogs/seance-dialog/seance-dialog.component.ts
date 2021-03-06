import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Cours} from '../../interfaces/cours';
import {Seance} from '../../interfaces/seance';

@Component({
  selector: 'app-seance-dialog',
  templateUrl: './seance-dialog.component.html',
  styleUrls: ['./seance-dialog.component.css']
})
export class SeanceDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<SeanceDialogComponent>, @Inject(MAT_DIALOG_DATA) private _seance: Seance) { }

  ngOnInit() {
  }

  get seance(): Seance {
    return this._seance;
  }

  onCancel() {
    this._dialogRef.close();
  }

  onSave(seance: Seance) {
    this._dialogRef.close(seance);
  }
}
