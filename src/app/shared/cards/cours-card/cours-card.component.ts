import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cours} from '../../interfaces/cours';

@Component({
  selector: 'app-cours-card',
  templateUrl: './cours-card.component.html',
  styleUrls: ['./cours-card.component.css']
})
export class CoursCardComponent implements OnInit {

  private _cours: Cours;
  private readonly _delete$: EventEmitter<Cours>;

  constructor() {
    this._cours = {} as Cours;
    this._delete$ = new EventEmitter<Cours>();
  }

  ngOnInit() {
  }

  get cours(): Cours {
    return this._cours;
  }

  @Input()
  set cours(value: Cours) {
    this._cours = value;
  }

  @Output('deleteCours')
  get delete$(): EventEmitter<Cours> {
    return this._delete$;
  }

  delete(cours: Cours) {
    this._delete$.emit(cours);
  }
}
