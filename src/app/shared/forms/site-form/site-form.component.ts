import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Site} from '../../interfaces/site';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css']
})
export class SiteFormComponent implements OnInit {

  private _site: Site;
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Site>;
  private readonly _form: FormGroup;

  constructor() {
    this._cancel$ = new EventEmitter<void>();
    this._submit$ = new EventEmitter<Site>();
    this._form = this._buildForm();
  }

  ngOnInit() {
  }

  get site(): Site {
    return this._site;
  }

  @Input()
  set site(site: Site) {
    this._site = site;
  }

  get form(): FormGroup {
    return this._form;
  }

  cancel() {
    this._cancel$.emit();
  }

  submit(site: Site) {
    this._submit$.emit(site);
  }

  @Output('cancel')
  get cancel$(): EventEmitter<void> {
    return this._cancel$;
  }

  @Output('submit')
  get submit$(): EventEmitter<Site> {
    return this._submit$;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      ville: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

}
