import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {filter} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {GroupesService} from '../shared/services/groupes.service';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {

  private _groupe: Groupe;


  constructor(private _groupesService: GroupesService, private _route: ActivatedRoute) {
    this._groupe = {} as Groupe;
  }

  get groupe(): Groupe {
    return this._groupe;
  }
  ngOnInit() {
    this._route.params.pipe(
      filter(params => !!params['id']),
      flatMap(params => this._groupesService.fetchOne(params['id']))
    )
      .subscribe((groupe: any) => this._groupe = groupe);
  }

}
