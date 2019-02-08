import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Site} from '../shared/interfaces/site';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  private _site: Site;
  private readonly _delete$: EventEmitter<Site>;

  constructor(private _route: ActivatedRoute) {
    this._delete$ = new EventEmitter<Site>();
  }

  ngOnInit() {
  }

  get site(): Site {
    return this._site;
  }

  @Input()
  set site(value: Site) {
    this._site = value;
  }

  @Output('deleteSite')
  get delete$(): EventEmitter<Site> {
    return this._delete$;
  }

  delete(site: Site) {
    this._delete$.emit(site);
  }
}
