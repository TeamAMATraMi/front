import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apprenant} from '../../interfaces/apprenant';

@Component({
  selector: 'app-apprenant-details',
  templateUrl: './apprenant-details.component.html',
  styleUrls: ['./apprenant-details.component.css']
})
export class ApprenantDetailsComponent implements OnInit {

  private _apprenant: Apprenant;
  private readonly _modifier$: EventEmitter<Apprenant>;

  constructor() {
    this._modifier$ = new EventEmitter<Apprenant>();
    this._apprenant = {} as Apprenant;
  }


  get apprenant(): Apprenant {
    return this._apprenant;
  }

  @Input()
  set apprenant(apprenant: Apprenant) {
    this._apprenant = apprenant;
  }

  @Output('modifier')
  get modifier$(): EventEmitter<Apprenant> {
    return this._modifier$;
  }

  ngOnInit() {
  }

  modifier() {
    this._modifier$.emit(this._apprenant);
  }

}
