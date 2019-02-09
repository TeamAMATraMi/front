import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Apprenant} from '../../interfaces/apprenant';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './apprenant-form.component.html',
  styleUrls: ['./apprenant-form.component.css']
})
export class ApprenantFormComponent implements OnInit, OnChanges {

  private _isUpdateMode: boolean;
  private _apprenant: Apprenant;
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Apprenant>;
  private readonly _form: FormGroup;

  constructor() {
    this._submit$ = new EventEmitter<Apprenant>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
  }

  @Input()
  set apprenant(apprenant: Apprenant) {
    this._apprenant = apprenant;
  }

  get apprenant(): Apprenant {
    return this._apprenant;
  }

  get form(): FormGroup {
    return this._form;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<Apprenant> {
    return this._submit$;
  }

  ngOnInit() {
  }

  ngOnChanges(record) {
    if (record.apprenant && record.apprenant.currentValue) {
      this._apprenant = record.apprenant.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._apprenant);
    } else {
      this._apprenant = {
        nom: '',
        prenom: '',
        telephone: '',
        adresse: '',
        codePostal: '',
        commune: '',
        idGroupe: 0,
        dateInscription: 0,
        auteurDossier: 0,
        majeur: true,
        dateNaissance: 0,
        genre: '',
        paysOrigine: '',
        nationalite: '',
        dateArrivee: 0,
        quartierPrioritaire: 0,
        situationPersonnelle: '',
        priseCharge: '',
        rsa: false,
        tempsScolarisation: 0,
        diplome: '',
        milieuScolaire: false,
        niveauLangue: '',
        lireLangue: false,
        ecrireLangue: false,
        lireAlphaLatin: false,
        ecrireAlphaLatin: false,
        cotisationPayee: false,
        remarques: ''
      };
      this._isUpdateMode = false;
    }
  }

  cancel() {
    this._cancel$.emit();
  }

  submit(apprenant: Apprenant) {
    this._submit$.emit(apprenant);
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
        Validators.required, Validators.pattern('(0|\\+33|0033)[1-9][0-9]{8}')
      ])),
      adresse: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(3)
      ])),
      codePostal: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('[0-9]{5}')
      ])),
      commune: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(1)
      ])),
      idGroupe: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dateInscription: new FormControl('', Validators.compose([
        Validators.required
      ])),
      auteurDossier: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(1)
      ])),
      majeur: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dateNaissance: new FormControl('', Validators.compose([
        Validators.required
      ])),
      genre: new FormControl('', Validators.compose([
        Validators.required
      ])),
      paysOrigine: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(1)
      ])),
      nationalite: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dateArrivee: new FormControl('', Validators.compose([
        Validators.required
      ])),
      quartierPrioritaire: new FormControl('', Validators.compose([

      ])),
      situationPersonnelle: new FormControl('', Validators.compose([
      ])),
      priseCharge: new FormControl('', Validators.compose([
        Validators.required
      ])),
      rsa: new FormControl('', Validators.compose([
        Validators.required
      ])),
      tempsScolarisation: new FormControl('', Validators.compose([
        Validators.required
      ])),
      diplome: new FormControl('', Validators.compose([
        Validators.required
      ])),
      milieuScolaire: new FormControl('', Validators.compose([
        Validators.required
      ])),
      niveauLangue: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2), Validators.maxLength(2)
      ])),
      lireLangue: new FormControl('', Validators.compose([
        Validators.required
      ])),
      ecrireLangue: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lireAlphaLatin: new FormControl('', Validators.compose([
        Validators.required
      ])),
      ecrireAlphaLatin: new FormControl('', Validators.compose([
        Validators.required
      ])),
      cotisationPayee: new FormControl('', Validators.compose([
        Validators.required
      ])),
      remarques: new FormControl('', Validators.compose([
      ]))
    });
  }

}
