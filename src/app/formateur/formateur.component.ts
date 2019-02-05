import { Component, OnInit } from '@angular/core';
import {Formateur} from '../shared/interfaces/formateur';
import {FormateursService} from '../shared/services/formateurs.service';
import {ActivatedRoute} from '@angular/router';
import {filter, flatMap} from 'rxjs/operators';
import {SitesService} from '../shared/services/sites.service';

@Component({
  selector: 'app-formateur',
  templateUrl: './formateur.component.html',
  styleUrls: ['./formateur.component.css']
})
export class FormateurComponent implements OnInit {

  private _formateur: Formateur;

  constructor(private _formateurService: FormateursService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._formateurService.fetchOne(params['id']))
    )
        .subscribe((apprenant: any) => this._formateur = apprenant);
  }

  get formateur(): Formateur {
    return this._formateur;
  }

  set formateur(value: Formateur) {
    this._formateur = value;
  }

  modifier(formateur: Formateur) {
    this._formateurService
        .update(formateur)
        .subscribe( _ => this._formateur = _);
  }

}
