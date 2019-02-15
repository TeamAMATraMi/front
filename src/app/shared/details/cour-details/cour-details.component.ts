import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from '../../interfaces/cours';
import {Presence} from '../../interfaces/presence';

@Component({
  selector: 'app-cour-details',
  templateUrl: './cour-details.component.html',
  styleUrls: ['./cour-details.component.css']
})
export class CourDetailsComponent implements OnInit {

  private _cour: Cours;
  private _presences: Presence[];
  private readonly _modifier$: EventEmitter<Cours>;

  constructor() {
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
  }

  modifier() {
    this._modifier$.emit(this._cour);
  }
}
