import { Component, OnInit } from '@angular/core';
import {Formateur} from '../shared/interfaces/formateur';
import {FormateursService} from '../shared/services/formateurs.service';
import {ActivatedRoute} from '@angular/router';
import {filter, flatMap} from 'rxjs/operators';
import {Presence} from '../shared/interfaces/presence';
import {PresencesService} from '../shared/services/presences.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.css']
})
export class PresenceComponent implements OnInit {

  private _presence: Presence;

  constructor(private _presenceService: PresencesService, private _route: ActivatedRoute) {
    this._presence = {} as Presence;
  }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._presenceService.fetchOne(params['id']))
    )
        .subscribe((presence: any) => this._presence = presence);
  }

  get presence(): Presence {
    return this._presence;
  }

  set presence(value: Presence) {
    this._presence = value;
  }

 /* modifier(presence: Presence) {
    this._presenceService
        .update(presence)
        .subscribe( _ => this._presence = _);
  }*/

}
