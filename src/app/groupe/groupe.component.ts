import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {filter} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {Formateur} from '../shared/interfaces/formateur';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {

  private _groupe: Groupe;
  private _apprenants: Apprenant[];
  private _site: Site;
  private readonly _delete$: EventEmitter<Groupe>;


  constructor(private _apprenantsService: ApprenantsService, private _route: ActivatedRoute, private _sitesService: SitesService) {
    this._groupe = {} as Groupe;
    this._apprenants = [];
    this._site = {} as Site;
    this._delete$ = new EventEmitter<Groupe>();
  }

  get groupe(): Groupe {
    return this._groupe;
  }

  get apprenants(): Apprenant[] {
    return this._apprenants;
  }

  @Input()
  set groupe(value: Groupe) {
    this._groupe = value;
    if (this._groupe.idSite !== undefined) {
      this._sitesService.fetchOne(this._groupe.idSite).subscribe((site: Site) => this._site = site);
    }
  }

  get site(): Site {
    return this._site;
  }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._apprenantsService.fetchByGroup(params['id']))
    )
        .subscribe((apprenants: Apprenant[]) => {
          this._apprenants = apprenants;
        });
  }

    @Output('deleteGroupe')
    get delete$(): EventEmitter<Groupe> {
        return this._delete$;
    }

    delete(groupe: Groupe) {
        this._delete$.emit(groupe);
    }
}
