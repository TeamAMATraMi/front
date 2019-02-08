import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Formateur} from '../../interfaces/formateur';

@Component({
  selector: 'app-formateurs-card',
  templateUrl: './formateurs-card.component.html',
  styleUrls: ['./formateurs-card.component.css']
})
export class FormateursCardComponent implements OnInit {

  private _formateur: Formateur;
  private readonly _delete$: EventEmitter<Formateur>;

  constructor() {
    this._formateur = {} as Formateur;
    this._delete$ = new EventEmitter<Formateur>();
  }

  ngOnInit() {
  }

  get formateur(): Formateur {
    return this._formateur;
  }

  @Input()
  set formateur(value: Formateur) {
    this._formateur = value;
  }

  @Output('deleteFormateur')
  get delete$(): EventEmitter<Formateur> {
    return this._delete$;
  }

  delete(formateur: Formateur) {
    this._delete$.emit(formateur);
  }
}
