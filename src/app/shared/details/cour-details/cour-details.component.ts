import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from '../../interfaces/cours';
import {Presence} from '../../interfaces/presence';
import {filter, flatMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {PresencesService} from '../../services/presences.service';
import {Seance} from '../../interfaces/seance';
import {MatTableDataSource} from '@angular/material';
import {Apprenant} from '../../interfaces/apprenant';
import {CoursService} from '../../services/cours.service';

@Component({
  selector: 'app-cour-details',
  templateUrl: './cour-details.component.html',
  styleUrls: ['./cour-details.component.css']
})
export class CourDetailsComponent implements OnInit {

  private _cour: Cours;
  private _presences: Presence[];
  private readonly _modifier$: EventEmitter<Cours>;
  private _dataSource: MatTableDataSource<Seance>;
  displayedColumns: string[] = ['date', 'horaire', 'modif'];



  constructor(private _presencesService: PresencesService, private _route: ActivatedRoute, private _coursService: CoursService) {
    this._modifier$ = new EventEmitter<Cours>();
    this._cour = {} as Cours;
    this._presences = [];
  }

  get cour(): Cours {
    return this._cour;
  }

  get seances(): Seance[] {
    return this._cour.seances;
  }

  get dataSource(): MatTableDataSource<Seance> {
    return this._dataSource;
  }

  deleteSeance() {

  }

  get presences(): Presence[] {
    return this._presences;
  }

  set presences(value: Presence[]) {
    this._presences = value;
  }

  @Output('modifier')
  get modifier$(): EventEmitter<Cours> {
    return this._modifier$;
  }

  ngOnInit() {
    this._route.params
        .subscribe(
            (params: Params) => {
              const id = +params['id'];
              this._coursService.fetchOne(id).subscribe((cours: Cours) => {
                this._cour = cours;
                this._dataSource = new MatTableDataSource<Seance>(this._cour.seances);
                console.log(this._dataSource);
              });
            }
        );

    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._presencesService.fetchByIdCours(params['id']))
    )
        .subscribe((presences: Presence[]) => this._presences = presences);

  }

  modifier() {
    this._modifier$.emit(this._cour);
  }
}
