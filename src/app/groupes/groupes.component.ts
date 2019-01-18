import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {GroupesService} from '../shared/services/groupes.service';
import {Apprenant} from '../shared/interfaces/apprenant';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent implements OnInit {

  private _groupes: Groupe[];

  constructor(private _router: Router, private _groupesService: GroupesService) {
    this._groupes = [];
  }


  get groupes(): Groupe[] {
    return this._groupes;
  }


  ngOnInit() {
    // TODO : fetch with associated service
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => this._groupes = groupes);
  }

  navigate(groupe: Groupe) {
    this._router.navigate(['/apprenantsG', groupe.id]);
  }

}
