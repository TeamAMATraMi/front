import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Apprenant} from '../../interfaces/apprenant';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AssociationsService} from '../../services/associations.service';
import {Association} from '../../interfaces/association';
import {QuartierPrioritaire} from '../../interfaces/quartier_prioritaire';
import {QuartiersService} from '../../services/quartiers.service';
import {GroupesService} from '../../services/groupes.service';
import {Groupe} from '../../interfaces/groupe';
import {formatDate} from '@angular/common';

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

  private _situation: string[] = ['Marié(e)', 'Célibataire', 'Concubinage', 'Veuf(ve)', 'Divorcé(e]', 'Séparé(e)', 'Pacsé(e)'];
  private _associations: Association[];
  private _quartiersPrio: QuartierPrioritaire[];
  private _groupes: Groupe[];

  constructor(private _associationsService: AssociationsService, private _quartiersService: QuartiersService,
              private _groupesService: GroupesService) {
    this._submit$ = new EventEmitter<Apprenant>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._associations = [];
    this._quartiersPrio = [];
    this._groupes = [];
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
    this._associationsService.fetch().subscribe((associations: Association[]) => this._associations = associations);
    this._quartiersService.fetch().subscribe((quartiers: QuartierPrioritaire[]) => this._quartiersPrio = quartiers);
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => this._groupes = groupes);
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
        auteurDossier: '',
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
      idGroupe: new FormControl('', Validators.compose([
        Validators.required
      ])),
      dateInscription: new FormControl({value: formatDate(new Date(), 'yyyy-MM-dd', 'en'), disabled: true}, Validators.compose([
      ])),
      auteurDossier: new FormControl('', Validators.compose([
        Validators.required
      ])),
      majeur: new FormControl('', Validators.compose([
      ])),
      dateNaissance: new FormControl('', Validators.compose([
      ])),
      genre: new FormControl('', Validators.compose([
      ])),
      paysOrigine: new FormControl('', Validators.compose([
        Validators.required
      ])),
      nationalite: new FormControl('', Validators.compose([
      ])),
      dateArrivee: new FormControl('', Validators.compose([
      ])),
      quartierPrioritaire: new FormControl('', Validators.compose([
      ])),
      situationPersonnelle: new FormControl('', Validators.compose([
      ])),
      priseCharge: new FormControl('', Validators.compose([
      ])),
      rsa: new FormControl('', Validators.compose([
      ])),
      tempsScolarisation: new FormControl('', Validators.compose([
      ])),
      diplome: new FormControl('', Validators.compose([
      ])),
      milieuScolaire: new FormControl('', Validators.compose([
      ])),
      niveauLangue: new FormControl('', Validators.compose([
      ])),
      lireLangue: new FormControl('', Validators.compose([
      ])),
      ecrireLangue: new FormControl('', Validators.compose([
      ])),
      lireAlphaLatin: new FormControl('', Validators.compose([
      ])),
      ecrireAlphaLatin: new FormControl('', Validators.compose([
      ])),
      cotisationPayee: new FormControl('', Validators.compose([
      ])),
      remarques: new FormControl('', Validators.compose([
      ]))
    });
  }

  get situation(): string[] {
    return this._situation;
  }

  get associations(): Association[] {
    return this._associations;
  }

  get quartiersPrio(): QuartierPrioritaire[] {
    return this._quartiersPrio;
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }
}
