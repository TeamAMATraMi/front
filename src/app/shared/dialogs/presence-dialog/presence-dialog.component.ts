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

  constructor(private _dialogRef: MatDialogRef<PresenceDialogComponent>, @Inject(MAT_DIALOG_DATA) private _presence: Presence) { }

  ngOnInit() {
  }

  get presence(): Presence {
    return this._presence;
  }

  onCancel() {
    this._dialogRef.close();
  }

  onSave(presence: Presence) {
    this._dialogRef.close(presence);
  }
}
