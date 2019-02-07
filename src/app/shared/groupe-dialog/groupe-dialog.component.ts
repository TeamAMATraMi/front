import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Groupe} from '../interfaces/groupe';

@Component({
  selector: 'app-groupe-dialog',
  templateUrl: './groupe-dialog.component.html',
  styleUrls: ['./groupe-dialog.component.css']
})
export class GroupeDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<GroupeDialogComponent>, @Inject(MAT_DIALOG_DATA) private _groupe: Groupe) { }

  ngOnInit() {
  }

  get groupe(): Groupe {
    return this._groupe;
  }

  onCancel() {
    this._dialogRef.close();
  }

  onSave(groupe: Groupe) {
    this._dialogRef.close(groupe);
  }
}
