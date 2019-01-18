import {Component, Input, OnInit} from '@angular/core';
import {Formateur} from '../interfaces/formateur';

@Component({
  selector: 'app-formateurs-card',
  templateUrl: './formateurs-card.component.html',
  styleUrls: ['./formateurs-card.component.css']
})
export class FormateursCardComponent implements OnInit {

  private _formateur: Formateur;

  constructor() { }

  ngOnInit() {
  }

  get formateur(): Formateur {
    return this._formateur;
  }

  @Input()
  set formateur(value: Formateur) {
    this._formateur = value;
  }
}
