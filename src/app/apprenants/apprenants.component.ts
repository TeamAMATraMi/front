import { Component, OnInit } from '@angular/core';
import {APPRENANT} from '../_static/bdd';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {

  private _apprenant: any;

  constructor() {
      this._apprenant = APPRENANT[0];
  }

  ngOnInit() {
      // TODO : fetch with associated service
  }

  get apprenant(): any {
      return this._apprenant;
  }

}
