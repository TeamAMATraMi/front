import { Component, OnInit } from '@angular/core';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {

  private _apprenants: Apprenant[];

  constructor(private _router: Router, private _apprenantsService: ApprenantsService) {
    this._apprenants = [];
  }


  get apprenants(): Apprenant[] {
    return this._apprenants;
  }


  ngOnInit() {
      // TODO : fetch with associated service
    this._apprenantsService.fetch().subscribe((apprenants: Apprenant[]) => this._apprenants = apprenants);
  }



}
