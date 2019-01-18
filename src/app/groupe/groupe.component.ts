import { Component, OnInit } from '@angular/core';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {ActivatedRoute} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {filter} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {group} from '@angular/animations';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {

  private _groupe: Groupe;


  constructor(private _groupesService: ApprenantsService, private _route: ActivatedRoute) {
    this._groupe = {} as Groupe;
  }

  get apprenant(): Groupe {
    return this._groupe;
  }
  ngOnInit() {
      filter(params => !!params['id']),
      flatMap(params => this._groupesService.fetchOne(params['id']));
  )
      .subscribe((groupe: any) => this._groupe = group);
  }

}
