import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Apprenant } from '../../interfaces/apprenant';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.css' ]
})
export class DialogComponent implements OnInit {

  /**
   * Component constructor
   */
  constructor(private _dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) private _apprenant: Apprenant) {
  }

  /**
   * Returns travel passed in apprenant-dialogs open
   */
  get apprenant(): Apprenant {
    return this._apprenant;
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
  }

  /**
   * Function to cancel the process and close the modal
   */
  onCancel() {
    this._dialogRef.close();
  }

  /**
   * Function to close the modal and send travel to parent
   */
  onSave(apprenant: Apprenant) {
    this._dialogRef.close(apprenant);
  }
}
