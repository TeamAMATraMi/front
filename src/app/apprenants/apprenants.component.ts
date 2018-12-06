import { Component, OnInit } from '@angular/core';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {

  private _apprenants: Apprenant[];

  constructor(private _apprenantsService: ApprenantsService) {
      this._apprenants = [];
  }

  ngOnInit() {
      // TODO : fetch with associated service
  }

  get apprenants(): Apprenant[] {
      return this._apprenants;
  }

}
