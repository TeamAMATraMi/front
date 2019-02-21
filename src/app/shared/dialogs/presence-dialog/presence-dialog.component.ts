import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Groupe} from '../../interfaces/groupe';
import {Presence} from '../../interfaces/presence';

@Component({
  selector: 'app-presence-dialog',
  templateUrl: './presence-dialog.component.html',
  styleUrls: ['./presence-dialog.component.css']
})
export class PresenceDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<PresenceDialogComponent>, @Inject(MAT_DIALOG_DATA) private _presences: Presence[]) { }

  ngOnInit() {
  }

  get presences(): Presence[] {
    return this._presences;
  }

  onCancel() {
    this._dialogRef.close();
  }

  onSave(presences: Presence[]) {
    this._dialogRef.close(presences);
  }
}
