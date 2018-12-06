import { Component, OnInit } from '@angular/core';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  private _sites: Site[];

  constructor(private _router: Router, private _sitesService: SitesService, private _route: ActivatedRoute) {
    this._sites = [];
  }

  ngOnInit() {
      this._sitesService.fetch()
          .subscribe(
              (sites: Site[]) => this._sites = sites
          );
  }

    get sites(): Site[] {
        return this._sites;
    }

}
