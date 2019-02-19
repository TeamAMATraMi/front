import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Groupe} from '../../interfaces/groupe';
import {Presence} from '../../interfaces/presence';
import {Apprenant} from '../../interfaces/apprenant';
import {ApprenantsService} from '../../services/apprenants.service';
import {PresencesService} from '../../services/presences.service';

@Component({
  selector: 'app-presence-form',
  templateUrl: './presence-form.component.html',
  styleUrls: ['./presence-form.component.css']
})
export class PresenceFormComponent implements OnInit, OnChanges {

  private _nomApprenant: string;
  private _present: boolean;
  private _isUpdateMode: boolean;
  private _presences: Presence[];
  private _apprenants: Apprenant[];
  private readonly _cancel$: EventEmitter<void>;
  private readonly _submit$: EventEmitter<Presence>;
  private readonly _form: FormGroup;

  constructor(private _apprenantsService: ApprenantsService, private _presencesService: PresencesService) {
    this._submit$ = new EventEmitter<Presence>();
    this._cancel$ = new EventEmitter<void>();
    this._form = this._buildForm();
    this._apprenants = [];
    this._presences = [];
  }

  ngOnInit() {
    this._apprenantsService.fetch().subscribe((apprenants: Apprenant[]) => {
          this._apprenants = apprenants;
          this._form.patchValue({nomApprenant: this._apprenants.length > 0 ?
                this._apprenants[0].nom + ' ' + this._apprenants[0].prenom : '' });
        }
    );
    this._presencesService.fetch().subscribe((presences: Presence[]) => {
      this._presences = presences;
    });
  }

  get form(): FormGroup {
    return this._form;
  }

  get nomApprenant(): string {
    return this._nomApprenant;
  }

  set nomApprenant(value: string) {
    this._nomApprenant = value;
  }

  get apprenants(): Apprenant[] {
    return this._apprenants;
  }

  set apprenants(value: Apprenant[]) {
    this._apprenants = value;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  set isUpdateMode(value: boolean) {
    this._isUpdateMode = value;
  }

  get presences(): Presence[] {
    return this._presences;
  }

  @Input()
  set presences(value: Presence[]) {
    this._presences = value;
  }

  cancel() {
    this._cancel$.emit();
  }

  submit(presence: Presence) {
    for (let i = 0; i < this.apprenants.length; i++) {
      if (this.apprenants[i].id === this._form.get('idApprenant').value) { presence.idApprenant = this._apprenants[i].id; }
    }
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
      id: new FormControl('0')
    });
  }

  ngOnChanges(record) {
    if (record.presence && record.presence.currentValue) {
      this._presences = record.presences.currentValue;
      this._isUpdateMode = true;

      for (let i = 0; i < this.apprenants.length; i++) {
        if (this._apprenants[i].id === record.presence.idApprenant) {
          this._nomApprenant = this._apprenants[i].nom + ' ' + this._apprenants[i].prenom;
        }
      }
      // this._form.patchValue(this._present);

    } else {
      this._isUpdateMode = false;
    }
  }
}
