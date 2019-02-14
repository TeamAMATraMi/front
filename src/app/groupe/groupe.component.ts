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
import {forEach} from '@angular/router/src/utils/collection';
import {ObservableInput} from 'rxjs';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {

  private _groupe: Groupe;
  private _apprenants: Apprenant[];
  private _sites: Site[];
  private _ville: string;
  private readonly _delete$: EventEmitter<Groupe>;


  constructor(private _apprenantsService: ApprenantsService, private _route: ActivatedRoute, private _sitesService: SitesService) {
    this._groupe = {} as Groupe;
    this._apprenants = [];
    this._sites = [];
    this._ville = 'default';
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
    this._sitesService.fetch().subscribe((sites: Site[]) => { this._sites = sites; });
  }

  get sites(): Site[] {
    return this._sites;
  }

  get ville(): string {
    return this._ville;
  }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._apprenantsService.fetchByGroup(params['id'])),
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
