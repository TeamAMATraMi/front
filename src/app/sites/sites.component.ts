import { Component, OnInit } from '@angular/core';
import {Site} from "../shared/interfaces/site";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  private _sites: Site[];
  private _siteForm: FormGroup;

  constructor() {
    this._sites = [];
  }

  ngOnInit() {

  }

    get sites(): Site[] {
        return this._sites;
    }

    set sites(value: Site[]) {
        this._sites = value;
    }
}
