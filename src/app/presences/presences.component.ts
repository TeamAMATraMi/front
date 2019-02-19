import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {GroupesService} from '../shared/services/groupes.service';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {GroupeDialogComponent} from '../shared/dialogs/groupe-dialog/groupe-dialog.component';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {Presence} from '../shared/interfaces/presence';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {PresencesService} from '../shared/services/presences.service';
import {PresenceDialogComponent} from '../shared/dialogs/presence-dialog/presence-dialog.component';

@Component({
  selector: 'app-presences',
  templateUrl: './presences.component.html',
  styleUrls: ['./presences.component.css']
})
export class PresencesComponent implements OnInit {

  private _displayedColumns = ['NomApprenant', 'Present'];
  private _presences: Presence[];
  private _dialogStatus: string;
  private _presencesDialog: MatDialogRef<PresenceDialogComponent>;
  private _apprenants: Apprenant[];
  private tmp: string;

  private _dataSource: MatTableDataSource<Presence>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _route: ActivatedRoute, private _presencesService: PresencesService,
              private _dialog: MatDialog, private _apprenantsService: ApprenantsService) {
    this._presences = [];
    this._dialogStatus = 'inactive';
    this._apprenants = [];
  }

  get apprenants(): Apprenant[] {
    return this._apprenants;
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._presencesService.fetchByIdCours(params['id']))
    )
        .subscribe((presences: Presence[]) => {
          this._presences = presences;
          this._dataSource = new MatTableDataSource<Presence>(this._presences);
        });

    this._apprenantsService.fetch().subscribe((apprenants: Apprenant[]) => { this._apprenants = apprenants; });

  }

  getNomApprenantById(id: number): string {
    this.tmp = 'default';
    this._apprenants.forEach(s => {
      if (s.id === id) {
        this.tmp = s.id.toString();
      }
    });
    return this.tmp;
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set presence-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._presencesDialog = this._dialog.open(PresenceDialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set presence-dialogs status and do process
    this._presencesDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (presences: Presence[]) => {
              this._presences = presences;
              // this._dataSource = new MatTableDataSource<Presence>(this._presences);
            },
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  private _add(presence: Presence): Observable<Presence[]> {
    return this._presencesService
        .create(presence)
        .pipe(
            flatMap(_ => this._presencesService.fetch())
        );
  }

  get presences(): Presence[] {
    return this._presences;
  }

  set presences(value: Presence[]) {
    this._presences = value;
  }

  get dataSource(): MatTableDataSource<Presence> {
    return this._dataSource;
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }

}
