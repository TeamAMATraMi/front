import {Component, Input, OnInit} from '@angular/core';
import {Apprenant} from '../../interfaces/apprenant';
import {Site} from '../../interfaces/site';

@Component({
  selector: 'app-sites-card',
  templateUrl: './sites-card.component.html',
  styleUrls: ['./sites-card.component.css']
})
export class SitesCardComponent implements OnInit {

  private _site: Site;

  constructor() { }

  ngOnInit() {
  }

  get site(): Site {
      return this._site;
  }

  @Input()
  set site(site: Site) {
      this._site = site;
  }

}
