import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Formateur} from '../../interfaces/formateur';
import {SitesService} from '../../services/sites.service';
import {Site} from '../../interfaces/site';

@Component({
  selector: 'app-formateur-form',
  templateUrl: './formateur-form.component.html',
  styleUrls: ['./formateur-form.component.css']
})
export class FormateurFormComponent implements OnInit, OnChanges {

  private _isUpdateMode: boolean;
  private _formateur: Formateur;
  private _sites: Site[];
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Formateur>;
  private readonly _form: FormGroup;

  constructor(private _sitesService: SitesService) {
    this._submit$ = new EventEmitter<Formateur>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._sites = [];
  }

  ngOnInit() {
    this._sitesService.fetch().subscribe((sites: Site[]) => this._sites = sites);
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

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  get formateur(): Formateur {
    return this._formateur;
  }

  @Input()
  set formateur(value: Formateur) {
    this._formateur = value;
  }

  cancel() {
    this._cancel$.emit();
  }

  submit(formateur: Formateur) {
    this._submit$.emit(formateur);
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<Formateur> {
    return this._submit$;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      nom: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      telephone: new FormControl('', Validators.compose([
        Validators.pattern('(0|\\+33|0033)[1-9][0-9]{8}')
      ])),
      adresse: new FormControl('', Validators.compose([
        Validators.minLength(3)
      ])),
      codePostal: new FormControl('', Validators.compose([
        Validators.pattern('[0-9]{5}')
      ])),
      commune: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      idSite: new FormControl('', Validators.compose([
      ])),
      salarie: new FormControl('', Validators.compose([
      ]))
    });
  }

  ngOnChanges(record) {
    if (record.formateur && record.formateur.currentValue) {
      this._formateur = record.formateur.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._formateur);
    } else {
      this._formateur = {
        nom: '',
        prenom: '',
        telephone: '',
        adresse: '',
        codePostal: '',
        commune: '',
        idSite: 0,
        salarie: false
      };
      this._isUpdateMode = false;
    }
  }

}
