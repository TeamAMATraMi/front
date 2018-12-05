import { Component, OnInit } from '@angular/core';
import {Site} from '../shared/interfaces/site';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  private _sites: Site[];

  constructor() {
    this._sites = [];
  }

  ngOnInit() {

  }

    get sites(): Site[] {
        return this._sites;
    }

}
