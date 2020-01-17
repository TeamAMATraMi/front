import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SitesService} from '../../services/sites.service';
import {Site} from '../../interfaces/site';
import {Groupe} from '../../interfaces/groupe';
import {Formateur} from '../../interfaces/formateur';
import {FormateursService} from '../../services/formateurs.service';

@Component({
  selector: 'app-groupe-form',
  templateUrl: './groupe-form.component.html',
  styleUrls: ['./groupe-form.component.css']
})
export class GroupeFormComponent implements OnInit, OnChanges {

  private _isUpdateMode: boolean;
  private _groupe: Groupe;
  private _sites: Site[];
  private _formateurs: Formateur[];

  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Groupe>;
  private readonly _form: FormGroup;
  private tmp: string;

  constructor(private _sitesService: SitesService, private _formateurService: FormateursService) {
    this._submit$ = new EventEmitter<Groupe>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._sites = [];
    this._formateurs = [];
  }

  ngOnInit() {
    this._sitesService.fetch().subscribe((sites: Site[]) => {
      this._sites = sites;
      this._form.patchValue({ville: this._sites.length > 0 ? this.getVilleByIdGroup(this._groupe.idSite) : '' });
        }
    );
    this._formateurService.fetch().subscribe((formateurs: Formateur[]) => {
          this._formateurs = formateurs;
        }
    );
  }

  getVilleByIdGroup(id: number): string {
    this.tmp = 'default';
    this._sites.forEach(s => {
      if (s.id === id) {
        this.tmp = s.ville;
      }
    });
    return this.tmp;
  }


  get form(): FormGroup {
    return this._form;
  }

  get sites(): Site[] {
    return this._sites;
  }

  set sites(value: Site[]) {
    this._sites = value;
  }

  get formateurs(): Formateur[] {
    return this._formateurs;
  }

  set formateurs(value: Formateur[]) {
    this._formateurs = value;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
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
      if (this._sites[i].ville === this._form.get('nomVille').value) {
        groupe.idSite = this._sites[i].id;
      }
    }
    for (let i = 0; i < this.formateurs.length; i++) {
      if (this._formateurs[i].nom === this._form.get('nomFormateur').value) {
        groupe.idFormateur = this._formateurs[i].id;
      }
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
      nomVille: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      nomFormateur: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnChanges(record) {
    if (record.groupe && record.groupe.currentValue) {
      this._groupe = record.groupe.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._groupe);

    } else {
      this._groupe = {
        idSite: 0,
        idFormateur: 0,
        nom: ''
      };
      this._isUpdateMode = false;
    }
  }
}
