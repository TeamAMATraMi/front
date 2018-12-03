import { Component, OnInit } from '@angular/core';
import {Formateur} from '../shared/interfaces/formateur';

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.css']
})
export class FormateursComponent implements OnInit {

  private _formateur: Formateur[];

  constructor() {
    this._formateur = [];
  }

  ngOnInit() {
    // TODO : fetch with associated service formateur
  }

}
