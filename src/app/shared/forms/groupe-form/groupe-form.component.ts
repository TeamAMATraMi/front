import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SitesService} from '../../services/sites.service';
import {Site} from '../../interfaces/site';
import {Groupe} from '../../interfaces/groupe';

@Component({
  selector: 'app-groupe-form',
  templateUrl: './groupe-form.component.html',
  styleUrls: ['./groupe-form.component.css']
})
export class GroupeFormComponent implements OnInit, OnChanges {

  private _ville: string;
  private _idSite: string;
  private _nom: string;
  private _isUpdateMode: boolean;
  private _groupe: Groupe;
  private _sites: Site[];
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Groupe>;
  private readonly _form: FormGroup;

  constructor(private _sitesService: SitesService) {
    this._submit$ = new EventEmitter<Groupe>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._sites = [];
  }

  ngOnInit() {
    this.ville = 'Tous les sites';
    this._sitesService.fetch().subscribe((sites: Site[]) => {
          this._sites = sites;
          this._form.patchValue({ville: this._sites.length > 0 ? this._sites[0].ville : '' });
        }
    );
  }

  get form(): FormGroup {
    return this._form;
  }

  get nom(): string {
    return this._nom;
  }

  set nom(value: string) {
    this._nom = value;
  }

  get idSite(): string {
    return this._idSite;
  }

  set idSite(value: string) {
    this._idSite = value;
  }

  get ville(): string {
    return this._ville;
  }

  set ville(value: string) {
    this._ville = value;
  }

  get sites(): Site[] {
    return this._sites;
  }

  set sites(value: Site[]) {
    this._sites = value;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  set isUpdateMode(value: boolean) {
    this._isUpdateMode = value;
  }

  get groupe(): Groupe {
    return this._groupe;
  }

  @Input()
  set groupe(value: Groupe) {
    this._groupe = value;
  }

  cancel() {
    this._cancel$.emit();
  }

  submit(groupe: Groupe) {
    for (let i = 0; i < this.sites.length; i++) {
      console.log(this._sites[i].ville + ', ' + this._form.get('ville').value);
      if (this._sites[i].ville === this._form.get('ville').value) { groupe.idSite = this._sites[i].id; }
    }
    this._submit$.emit(groupe);
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<Groupe> {
    return this._submit$;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      nom: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      ville: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnChanges(record) {
    if (record.groupe && record.groupe.currentValue) {
      this._groupe = record.groupe.currentValue;
      this._isUpdateMode = true;
      console.log(this._groupe.idSite);

      for (let i = 0; i < this.sites.length; i++) {
        if (this._sites[i].id === record.groupe.idSite) {
          this._ville = this._sites[i].ville;
        }
      }
      this._form.patchValue({ville: this._ville});

      this._form.patchValue(this._groupe);

    } else {
      this._groupe = {
        idSite: 0,
        nom: ''
      };
      this._isUpdateMode = false;
    }
  }
}
