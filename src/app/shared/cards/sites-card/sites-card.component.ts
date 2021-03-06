import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Site} from '../../interfaces/site';

@Component({
  selector: 'app-sites-card',
  templateUrl: './sites-card.component.html',
  styleUrls: ['./sites-card.component.css']
})
export class SitesCardComponent implements OnInit {

  private _site: Site;
  private readonly _delete$: EventEmitter<Site>;

  constructor() {
    this._site = {} as Site;
    this._delete$ = new EventEmitter<Site>();
  }

  ngOnInit() { }

  get site(): Site {
    return this._site;
  }

  @Input()
  set site(site: Site) {
    this._site = site;
  }

  @Output('deleteSite')
  get delete$(): EventEmitter<Site> {
    return this._delete$;
  }

  delete(site: Site) {
    this._delete$.emit(site);
  }

}
