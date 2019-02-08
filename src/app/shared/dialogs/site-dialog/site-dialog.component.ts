import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Site} from '../../interfaces/site';

@Component({
  selector: 'app-site-dialog',
  templateUrl: './site-dialog.component.html',
  styleUrls: ['./site-dialog.component.css']
})
export class SiteDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<SiteDialogComponent>, @Inject(MAT_DIALOG_DATA) private _site: Site) { }

  ngOnInit() {
  }

  get site(): Site {
    return this._site;
  }

  onCancel() {
    this._dialogRef.close();
  }

  onSave(site: Site) {
    this._dialogRef.close(site);
  }

}
