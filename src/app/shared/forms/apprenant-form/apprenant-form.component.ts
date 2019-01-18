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
    if (record.model && record.model.currentValue) {
      this._apprenant = record.model.currentValue;
      this._isUpdateMode = true;
      this._form.patchValue(this._apprenant);
    } else {
      // this._apprenant = {};
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
      _id: new FormControl('0'),
      nom: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(1)
      ]))
    });
  }

}
