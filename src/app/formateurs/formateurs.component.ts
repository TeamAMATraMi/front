import { Component, OnInit } from '@angular/core';
import {Formateur} from '../shared/interfaces/formateur';
import {Router} from '@angular/router';
import {FormateursService} from '../shared/services/formateurs.service';
import {Apprenant} from '../shared/interfaces/apprenant';

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.css']
})
export class FormateursComponent implements OnInit {

  private _formateurs: Formateur[];

  constructor(private _router: Router, private formateurService: FormateursService) {
    this._formateurs = [];
  }

  ngOnInit() {
    // TODO : fetch with associated service formateur
    this.formateurService.fetch().subscribe((formateur: Formateur[]) => this._formateurs = formateur);
  }

  navigate(formateur: Formateur) {
    this._router.navigate(['/formateur', formateur.id]);
  }

  get formateurs(): Formateur[] {
    return this._formateurs;
  }
}
