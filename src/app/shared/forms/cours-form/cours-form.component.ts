import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
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
export class CoursFormComponent implements OnInit, OnChanges {

  private _isUpdateMode: boolean;
  private _cours: Cours;
  private _formateurs: Formateur[];
  private _groupes: Groupe[];
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Cours>;
  private readonly _form: FormGroup;
  private tmp: string;

  constructor(private _formateurService: FormateursService, private _groupesService: GroupesService) {
    this._submit$ = new EventEmitter<Cours>();
    this._cancel$ = new EventEmitter<void>();
    this._formateurs = [];
    this._groupes = [];
    this._form = this._buildForm();
  }

  ngOnInit() {
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => {
        this._groupes = groupes;
        console.log(groupes);
      this._form.patchValue({nomGroupe: this._groupes.length > 0 ? this.getNomByIdGroupe(this._cours.idGroupe) : '' });
    });
    this._formateurService.fetch().subscribe((formateurs: Formateur[]) => {
        this._formateurs = formateurs;
        this._form.patchValue({formateur: this._formateurs.length > 0 ? this.getNomByIdFormateur(this._cours.idFormateur) : '' });
    });
  }

  getNomByIdGroupe(id: number): string {
    this.tmp = 'default';
    this._groupes.forEach(s => {
      if (s.id === id) {
        this.tmp = s.nom;
      }
    });
    return this.tmp;
  }

  getNomByIdFormateur(id: number): string {
    this.tmp = 'default';
    this._formateurs.forEach(s => {
      if (s.id === id) {
        this.tmp = s.nom + ' ' + s.prenom;
      }
    });
    return this.tmp;
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

  get formateurs(): Formateur[] {
    return this._formateurs;
  }

  set formateurs(value: Formateur[]) {
    this._formateurs = value;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      matiere: new FormControl('', Validators.compose([
        Validators.required
      ])),
      idFormateur: new FormControl('', Validators.compose([
        Validators.required
      ])),
      duree: new FormControl('', Validators.compose([
        Validators.required
      ])),
      idGroupe: new FormControl('', Validators.compose([
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

  submit(cours: Cours) {
    for (let i = 0; i < this._groupes.length; i++) {
      if (this._groupes[i].nom === this._form.get('idGroupe').value) { cours.idGroupe = this._groupes[i].id; }
    }
    for (let i = 0; i < this._formateurs.length; i++) {
      if ((this._formateurs[i].nom + ' ' + this.formateurs[i].prenom) === this._form.get('idFormateur').value) {
        cours.idFormateur = this._formateurs[i].id;
      }
    }
    console.log("submit : ");
    console.log(cours);
    this._submit$.emit(cours);
  }

  ngOnChanges(record) {
    if (record.cours && record.cours.currentValue) {
      this._cours = record.cours.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._cours);
    } else {
      this._cours = {
        duree: 0,
        idFormateur: 0,
        idGroupe: 0,
        seances: [],
        matiere: ''
      };
      this._isUpdateMode = false;
    }
  }
}
