import { Component, OnInit } from '@angular/core';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {Router} from '@angular/router';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {GroupesService} from '../shared/services/groupes.service';
import {Groupe} from '../shared/interfaces/groupe';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {

  private _apprenants: Apprenant[];
  private _sites: Site[];
  private  _groupes: Groupe[];

  constructor(private _router: Router, private _apprenantsService: ApprenantsService, private _sitesService: SitesService,
              private _groupesService: GroupesService) {
    this._apprenants = [];
    this._sites = [];
    this._groupes = [];
  }


  get apprenants(): Apprenant[] {
    return this._apprenants;
  }

  get sites(): Site[] {
    return this._sites;
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }


  delete(apprenant: Apprenant) {
    this._apprenantsService
        .delete(apprenant.id)
        .subscribe(_ => this._apprenants = this._apprenants.filter(__ => __.id !== _));
  }

  ngOnInit() {
      // TODO : fetch with associated service
    this._apprenantsService.fetch().subscribe((apprenants: Apprenant[]) => this._apprenants = apprenants);
    this._sitesService.fetch().subscribe((sites: Site[]) => this._sites = sites);
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => this._groupes = groupes);
  }



}
