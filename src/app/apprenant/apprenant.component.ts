import { Component, OnInit } from '@angular/core';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {ActivatedRoute} from '@angular/router';
import {Apprenant} from '../shared/interfaces/apprenant';
import {filter, flatMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-apprenant',
  templateUrl: './apprenant.component.html',
  styleUrls: ['./apprenant.component.css']
})
export class ApprenantComponent implements OnInit {

  private _apprenant: Apprenant;


  constructor(private _apprenantsService: ApprenantsService, private _route: ActivatedRoute) {
    this._apprenant = {} as Apprenant;
  }

  get apprenant(): Apprenant{
    return this._apprenant;
  }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._apprenantsService.fetchOne(params['id']))
    )
        .subscribe((apprenant: any) => this._apprenant = apprenant);
  }

}
