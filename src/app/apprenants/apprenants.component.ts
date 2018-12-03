import { Component, OnInit } from '@angular/core';
import {Apprenant} from '../shared/interfaces/apprenant';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {

  private _apprenants: Apprenant[];

  constructor() {
      this._apprenants = [];
  }

  ngOnInit() {
      // TODO : fetch with associated service
  }

  get apprenants(): Apprenant[] {
      return this._apprenants;
  }

}
