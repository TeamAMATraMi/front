import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {filter} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {

  private _groupe: Groupe;
  private _apprenants: Apprenant[];


  constructor(private _apprenantsService: ApprenantsService, private _route: ActivatedRoute) {
    this._groupe = {} as Groupe;
    this._apprenants = [];
  }

  get groupe(): Groupe {
    return this._groupe;
  }

  get apprenants(): Apprenant[] {
    return this._apprenants;
  }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._apprenantsService.fetchByGroup(params['id']))
    )
        .subscribe((apprenants: Apprenant[]) => {
          this._apprenants = apprenants;
        });
  }
}
