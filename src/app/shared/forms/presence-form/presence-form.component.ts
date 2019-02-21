import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Presence} from '../../interfaces/presence';
import {PresencesService} from '../../services/presences.service';
import {Cours} from '../../interfaces/cours';

@Component({
  selector: 'app-presence-form',
  templateUrl: './presence-form.component.html',
  styleUrls: ['./presence-form.component.css']
})
export class PresenceFormComponent implements OnInit, OnChanges {
  private _presences: Presence[];
  private _cours: Cours;
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Presence[]>;
  private readonly _form: FormGroup;

  constructor(private _presencesService: PresencesService) {
    this._submit$ = new EventEmitter<Presence[]>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._presences = [];
    this._cours = {} as Cours;
  }

  ngOnInit() {
    this._presencesService.fetchByIdCours(this._cours.id).subscribe((presences: Presence[]) => {
      this._presences = presences;
    });
  }

  get form(): FormGroup {
    return this._form;
  }

  get presences(): Presence[] {
    return this._presences;
  }

  @Input()
  set presences(value: Presence[]) {
    this._presences = value;
  }

  get cours() {
    return this._cours;
  }

  @Input()
  set cours(value: Cours) {
    this._cours = value;
  }

  cancel() {
    this._cancel$.emit();
  }

  submit(presences: Presence[]) {
    this._submit$.emit(presences);
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<Presence[]> {
    return this._submit$;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      idApprenant: new FormControl('0'),
      present: new FormControl('')
    });
  }

  ngOnChanges(record) {
    if (record.presences && record.presences.currentValue) {
      this._presences = record.presences.currentValue;
      this._form.patchValue(this._presences);
    }
  }
}
