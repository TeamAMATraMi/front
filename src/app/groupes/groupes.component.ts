import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {GroupesService} from '../shared/services/groupes.service';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {GroupeDialogComponent} from '../shared/dialogs/groupe-dialog/groupe-dialog.component';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent implements OnInit {

  private _displayedColumns = ['Nom', 'Site', 'Delete'];
  private _dataSource: Groupe[];
  private _dialogStatus: string;
  private _groupesDialog: MatDialogRef<GroupeDialogComponent>;
  private _searchText: string;
  private readonly _delete$: EventEmitter<Groupe>;
  private _sites: Site[];
  private tmp: string;

  constructor(private _router: Router, private _groupesService: GroupesService,
              private _dialog: MatDialog, private _sitesService: SitesService) {
    this._dialogStatus = 'inactive';
    this._sitesService.fetch().subscribe((sites: Site[]) => { this._sites = sites; });
  }

  get sites(): Site[] {
    return this._sites;
  }

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  set dialogStatus(value: string) {
    this._dialogStatus = value;
  }

  ngOnInit() {
    this._groupesService.fetch().subscribe((_) => this._dataSource = _);
  }

  getVilleByIdGroup(id: number ): string {
    this.tmp = 'default';
      this._sites.forEach(s => {
        if (s.id === id) {
            this.tmp = s.ville;
        }
      });
      return this.tmp;
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set apprenant-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._groupesDialog = this._dialog.open(GroupeDialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._groupesDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (groupes: Groupe[]) => this._dataSource = groupes,
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  private _add(groupe: Groupe): Observable<Groupe[]> {
    return this._groupesService
        .create(groupe)
        .pipe(
            flatMap(_ => this._groupesService.fetch())
        );
  }

  @Output('deleteGroupe')
  get delete$(): EventEmitter<Groupe> {
    return this._delete$;
  }

  delete(id: number) {
    this._groupesService.delete(id).subscribe(null, null, () => this.ngOnInit());
  }


  get dataSource(): Groupe[] {
    return this._dataSource;
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }

}
