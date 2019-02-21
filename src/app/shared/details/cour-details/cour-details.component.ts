import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from '../../interfaces/cours';
import {Presence} from '../../interfaces/presence';
import {filter, flatMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {PresencesService} from '../../services/presences.service';

@Component({
  selector: 'app-cour-details',
  templateUrl: './cour-details.component.html',
  styleUrls: ['./cour-details.component.css']
})
export class CourDetailsComponent implements OnInit {

  private _cour: Cours;
  private _presences: Presence[];
  private readonly _modifier$: EventEmitter<Cours>;

  constructor(private _presencesService: PresencesService, private _route: ActivatedRoute) {
    this._modifier$ = new EventEmitter<Cours>();
    this._cour = {} as Cours;
    this._presences = [];
  }

  get cour(): Cours {
    return this._cour;
  }

  @Input()
  set cour(cour: Cours) {
    this._cour = cour;
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
