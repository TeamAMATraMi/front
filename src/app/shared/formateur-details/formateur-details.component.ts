import {Component, Input, OnInit} from '@angular/core';
import {Formateur} from '../interfaces/formateur';
import {SitesService} from '../services/sites.service';
import {Site} from '../interfaces/site';

@Component({
  selector: 'app-formateur-details',
  templateUrl: './formateur-details.component.html',
  styleUrls: ['./formateur-details.component.css']
})
export class FormateurDetailsComponent implements OnInit {

  private _formateur: any;
  private _site: Site;

  constructor(private _sitesService: SitesService) {
    this._formateur = {} as Formateur;
    this._site = {} as Site;
  }

  ngOnInit() {

  }

  get formateur(): any {
    return this._formateur;
  }

  @Input()
  set formateur(value: any) {
    this._formateur = value;
    if (this._formateur.idSite !== undefined) {
    this._sitesService.fetchOne(this._formateur.idSite).subscribe((site: Site) => this._site = site);
    }
  }

  get site(): Site {
    return this._site;
  }

}
