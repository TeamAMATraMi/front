import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Cours} from '../../interfaces/cours';
import {GroupesService} from '../../services/groupes.service';
import {Groupe} from '../../interfaces/groupe';
import {Formateur} from '../../interfaces/formateur';
import {FormateursService} from '../../services/formateurs.service';
import {Seance} from '../../interfaces/seance';
import {SeancesService} from '../../services/seances.service';
import {CoursService} from '../../services/cours.service';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-seance-form',
  templateUrl: './seance-form.component.html',
  styleUrls: ['./seance-form.component.css']
})
export class SeanceFormComponent implements OnInit, OnChanges {

  private _isUpdateMode: boolean;
  private _seance: Seance;
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Seance>;
  private readonly _form: FormGroup;


  constructor() {
    this._submit$ = new EventEmitter<Seance>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();

  }

  ngOnInit() {
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  get seance(): Seance {
    return this._seance;
  }

  @Input()
  set seance(value: Seance) {
    this._seance = value;
  }

  get form(): FormGroup {
    return this._form;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      date: new FormControl('', Validators.compose([
        Validators.required
      ])),
      horaire: new FormControl('', Validators.compose([
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
  get submit$(): EventEmitter<Seance> {
    return this._submit$;
  }

  submit(seance: Seance) {
    this._submit$.emit(seance);
  }

  ngOnChanges(record) {
    if (record.seance && record.seance.currentValue) {
      this._seance = record.seance.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._seance);
    } else {
      this._seance = {
        cours: null,
        date: '',
        horaire: '',
        idPresence: 0
      };
      this._isUpdateMode = false;
    }
  }
}
