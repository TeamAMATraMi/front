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
  }



  get site(): Site {
    console.log('site');
    this._sitesService.fetchOne(this.formateur.idSite).subscribe((site: Site) => this._site = site);
    return this._site;
  }

  @Input()
  set site(value: Site) {
    this._site = value;
  }
}
