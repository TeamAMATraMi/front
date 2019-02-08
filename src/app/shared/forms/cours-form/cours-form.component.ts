import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apprenant} from '../../interfaces/apprenant';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cours} from '../../interfaces/cours';
import {GroupesService} from '../../services/groupes.service';
import {Groupe} from '../../interfaces/groupe';
import {Formateur} from '../../interfaces/formateur';
import {FormateursService} from '../../services/formateurs.service';

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.css']
})
export class CoursFormComponent implements OnInit {

  private _formateur: string;
  private _groupe: string;
  private _isUpdateMode: boolean;
  private _cours: Cours;
  private _formateurs: Formateur[];
  private _groupes: Groupe[];
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Cours>;
  private readonly _form: FormGroup;

  constructor(private _formateurService: FormateursService, private _groupesService: GroupesService) {
    this._submit$ = new EventEmitter<Cours>();
    this._cancel$ = new EventEmitter<void>();
    this._formateurs = [];
    this._form = this._buildForm();
  }

  ngOnInit() {
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => {
          this._groupes = groupes;
          this._form.patchValue({groupe: this._groupes.filter(groupe => groupe.id === this._cours.idGroupe)[0].nom});
        }
    );
    this._formateurService.fetch().subscribe((formateurs: Formateur[]) => {
          this._formateurs = formateurs;
          this._form.patchValue({formateur: this._formateurs.filter(formateur => formateur.id === this._cours.idFormateur)[0].nom});
        }
    );
  }

  get ville(): string {
    return this._formateur;
  }

  set ville(value: string) {
    this._formateur = value;
  }

  get groupe(): string {
    return this._groupe;
  }

  set groupe(value: string) {
    this._groupe = value;
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  set groupes(value: Groupe[]) {
    this._groupes = value;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  set isUpdateMode(value: boolean) {
    this._isUpdateMode = value;
  }

  get cours(): Cours {
    return this._cours;
  }

  @Input()
  set cours(value: Cours) {
    this._cours = value;
  }

  get form(): FormGroup {
    return this._form;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      matiere: new FormControl('', Validators.compose([
        Validators.required
      ])),
      horaire: new FormControl('', Validators.compose([
        Validators.required
      ])),
      formateur: new FormControl('', Validators.compose([
        Validators.required
      ])),
      duree: new FormControl('', Validators.compose([
        Validators.required
      ])),
      groupe: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  cancel() {
    this._cancel$.emit();
  }

  @Output('submit')
  get submit$(): EventEmitter<Cours> {
    return this._submit$;
  }
}
