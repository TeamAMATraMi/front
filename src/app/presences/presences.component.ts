import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MatPaginator, MatTableDataSource} from '@angular/material';
import {Observable} from 'rxjs';
import {Presence} from '../shared/interfaces/presence';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {PresencesService} from '../shared/services/presences.service';
import {PresenceDialogComponent} from '../shared/dialogs/presence-dialog/presence-dialog.component';
import {CoursService} from '../shared/services/cours.service';
import {Cours} from '../shared/interfaces/cours';
import {SeancesService} from '../shared/services/seances.service';
import {Seance} from '../shared/interfaces/seance';

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
  private datetab: Array<number>;
  private _nomCours: string;
  private _idCours: number;
  private _dataSource: MatTableDataSource<number>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _route: ActivatedRoute, private _presencesService: PresencesService,
              private _dialog: MatDialog, private _seancesService: SeancesService,
              private _apprenantsService: ApprenantsService, private _coursService: CoursService) {
    this._presences = [];
    this._dialogStatus = 'inactive';
    this._apprenants = [];
    this.datetab = [];
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
          for (let i = 0; i < this._presences.length; i++) {
            if (!this.datetab.includes(this.dateConverter(this._presences[i].date), 0)) {
              this.datetab.push(this.dateConverter(this._presences[i].date));
            }
          }
          this._seancesService.fetchOne(this._presences[0].idSeance).subscribe((value: Seance) => {
            this._idCours = value.cours.id;
            this._nomCours = value.cours.matiere;
          });
          this._dataSource = new MatTableDataSource<number>(this.datetab);
          this._apprenantsService.fetch().subscribe((apprenants: Apprenant[]) => { this._apprenants = apprenants; });
        });
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

  get idCours(): number {
    return this._idCours;
  }

  set idCours(value: number) {
    this._idCours = value;
  }

  get presences(): Presence[] {
    return this._presences;
  }

  set presences(value: Presence[]) {
    this._presences = value;
  }

  get dataSource(): MatTableDataSource<number> {
    return this._dataSource;
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }

  private dateConverter(date: Date): number {
    let res = 0;
    res = date.getFullYear() * 1000 + date.getMonth() * 100 + date.getDay();
    return res;
  }

}
