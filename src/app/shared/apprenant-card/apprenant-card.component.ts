import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apprenant} from '../interfaces/apprenant';

@Component({
  selector: 'app-apprenant-card',
  templateUrl: './apprenant-card.component.html',
  styleUrls: ['./apprenant-card.component.css']
})
export class ApprenantCardComponent implements OnInit {

  private _apprenant: any;
  private readonly _delete$: EventEmitter<Apprenant>;

  constructor() {
    this._apprenant = {} as Apprenant;
    this._delete$ = new EventEmitter<Apprenant>();
  }


  get apprenant(): Apprenant {
    return this._apprenant;
  }

  @Input()
  set apprenant(apprenant: Apprenant) {
    this._apprenant = apprenant;
  }

  @Output('deleteApprenant')
  get delete$(): EventEmitter<Apprenant> {
    return this._delete$;
  }

  delete(apprenant: Apprenant) {
    this._delete$.emit(apprenant);
  }


  ngOnInit() {
  }

}
