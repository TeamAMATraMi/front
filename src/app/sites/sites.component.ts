import {Component, OnInit, ViewChild} from '@angular/core';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {Router} from '@angular/router';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatTableDataSource,MatSort, Sort} from '@angular/material';
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
  private _displayedColumns = ['id', 'ville', 'Delete'];

  private _dataSource: MatTableDataSource<Site>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, private _sitesService: SitesService, private _dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this._sites = [];
    this._dialogStatus = 'inactive';
  }

  ngOnInit() {
    this._sitesService.fetch().subscribe((sites: Site[]) => {
      this._sites = sites;
      this._dataSource = new MatTableDataSource<Site>(this._sites);
      this._dataSource.paginator = this.paginator;
      this._dataSource.sort = this.sort;
      this._dataSource.filterPredicate = (data: {ville: string}, filterValue: string) =>
        data.ville.trim().toLowerCase().indexOf(filterValue) !== -1;
    });
  }

  get dataSource(): MatTableDataSource<Site> {
    return this._dataSource;
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

  showDialog() {
    this._dialogStatus = 'active';

    // open modal
    this._sitesDialog = this._dialog.open(SiteDialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set site-dialogs status and do process
    this._sitesDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        flatMap(_ => this._add(_))
      )
      .subscribe(
        (sites: Site[]) => {
          this._sites = sites;
          this._dataSource = new MatTableDataSource<Site>(this._sites);
          this._dataSource.paginator = this.paginator;
        },
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  private _add(site: Site): Observable<Site[]> {
    this.addOpenSnackBar();
    return this._sitesService
      .create(site)
      .pipe(
        flatMap(_ => this._sitesService.fetch())
      );
  }

sortData(sort: Sort) {
    const data = this._dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this._dataSource.data = data;
      return;
    }
    this._dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'ville': return compare(a.ville, b.ville, isAsc);
        default: return 0;
      }
    });
  }


  delete(id: number) {
    this._sitesService
      .delete(id)
      .subscribe(null, null, () => this.ngOnInit());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this._dataSource.filter = filterValue;
    this._dataSource.paginator.firstPage();
  }

  deleteConfirmation(id: number) {
    if (confirm('Voulez vous vraiment supprimer ce site ?')) {
      this.delete(id);
      this.deleteOpenSnackBar();
    }
  }

  addOpenSnackBar() {
    this.snackBar.open('Ajout effectué avec succés', 'OK', {
      duration: 3000
    });
  }

  deleteOpenSnackBar() {
    this.snackBar.open('suppression effectué', 'OK', {
      duration: 3000
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
