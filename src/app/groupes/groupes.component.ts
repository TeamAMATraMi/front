import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {GroupesService} from '../shared/services/groupes.service';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {GroupeDialogComponent} from '../shared/dialogs/groupe-dialog/groupe-dialog.component';
import {Formateur} from '../shared/interfaces/formateur';
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
  private _groupes: Groupe[];
  private _dialogStatus: string;
  private _groupesDialog: MatDialogRef<GroupeDialogComponent>;
  private _searchText: string;
  private readonly _delete$: EventEmitter<Groupe>;
  private _sites: Site[];

  constructor(private _router: Router, private _groupesService: GroupesService,
              private _dialog: MatDialog, private _sitesService: SitesService) {
    this._groupes = [];
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

  get groupes(): Groupe[] {
    return this._groupes;
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  set dialogStatus(value: string) {
    this._dialogStatus = value;
  }

  ngOnInit() {
    // TODO : fetch with associated service
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => this._groupes = groupes);
    this._groupesService.fetch().subscribe((_) => this._dataSource = _);
  }

  navigate(groupe: Groupe) {
    this._router.navigate(['/apprenantsG', groupe.id]);
  }


  getVilleByIdGroup(id: number ): string {
      this._sites.forEach(s => {
        if (s.id === id) {
            return s.ville;
        }
      });
      return 'tototottoo';
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

  /*delete(groupe: Groupe) {
    this._groupesService
        .delete(groupe.id)
        .subscribe(_ => {
          return this._groupes = this._groupes.filter(__ => __.id !== _);
        });
  }*/

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
