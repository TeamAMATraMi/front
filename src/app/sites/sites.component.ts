import { Component, OnInit } from '@angular/core';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {Router} from '@angular/router';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {SiteDialogComponent} from '../shared/dialogs/site-dialog/site-dialog.component';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  private _sites: Site[];
  private _dialogStatus: string;
  private _sitesDialog: MatDialogRef<SiteDialogComponent>;
  private _searchText: string;
  private _dataSource: Site[];
  private _displayedColumns = ['id', 'ville', 'Delete'];



  constructor(private _router: Router, private _sitesService: SitesService, private _dialog: MatDialog) {
    this._sites = [];
    this._dialogStatus = 'inactive';
  }

  ngOnInit() {
      this._sitesService.fetch().subscribe((sites: Site[]) => this._dataSource = sites);
  }

  get dataSource(): Site[] {
      return this._dataSource;
  }

  get searchText(): string {
      return this._searchText;
  }

  set searchText(value: string) {
      this._searchText = value;
  }

  get displayedColumns(): any {
      return this._displayedColumns;
  }

  get sites(): Site[] {
      return this._sites;
  }

  get dialogStatus(): string {
      return this._dialogStatus;
  }

  set dialogStatus(value: string) {
      this._dialogStatus = value;
  }

  showDialog() {
      this._dialogStatus = 'active';

      // open modal
      this._sitesDialog = this._dialog.open(SiteDialogComponent, {
          width: '500px',
          disableClose: true
      });

      // subscribe to afterClosed observable to set apprenant-dialogs status and do process
      this._sitesDialog.afterClosed()
          .pipe(
              filter(_ => !!_),
              flatMap(_ => this._add(_))
          )
          .subscribe(
              (sites: Site[]) => this._dataSource = sites,
              _ => this._dialogStatus = 'inactive',
              () => this._dialogStatus = 'inactive'
          );
  }

  private _add(site: Site): Observable<Site[]> {
      return this._sitesService
          .create(site)
          .pipe(
              flatMap(_ => this._sitesService.fetch())
          );
  }

  delete(id: number) {
      this._sitesService
          .delete(id)
          .subscribe(null, null, () => this.ngOnInit());
  }

}
