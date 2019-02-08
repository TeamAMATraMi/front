import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from '../../interfaces/cours';

@Component({
  selector: 'app-cour-details',
  templateUrl: './cour-details.component.html',
  styleUrls: ['./cour-details.component.css']
})
export class CourDetailsComponent implements OnInit {

  private _cour: Cours;
  private readonly _modifier$: EventEmitter<Cours>;

  constructor() {
    this._modifier$ = new EventEmitter<Cours>();
    this._cour = {} as Cours;
  }

  get cour(): Cours {
    return this._cour;
  }

  @Input()
  set cour(cour: Cours) {
    this._cour = cour;
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
