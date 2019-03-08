import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Presence} from '../../interfaces/presence';
import {PresencesService} from '../../services/presences.service';
import {Cours} from '../../interfaces/cours';
import {formatDate} from '@angular/common';
import {filter, flatMap} from 'rxjs/operators';
import {Apprenant} from '../../interfaces/apprenant';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-presence-form',
  templateUrl: './presence-form.component.html',
  styleUrls: ['./presence-form.component.css']
})
export class PresenceFormComponent implements OnInit, OnChanges {
  private _presences: Presence[];
  private _cours: Cours;
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Presence>;
  private readonly _form: FormGroup;

  constructor(private _presencesService: PresencesService, private _route: ActivatedRoute) {
    this._submit$ = new EventEmitter<Presence>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._presences = [];
    this._cours = {} as Cours;
  }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._presencesService.fetchByFichePresence(params['id'], params['date'])),
    )
        .subscribe((presences: Presence[]) => {
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

  submit(presence: Presence) {
    this._submit$.emit(presence);
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<Presence> {
    return this._submit$;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.compose([])),
      idApprenant: new FormControl('0'),
      idcours: new FormControl('0'),
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
