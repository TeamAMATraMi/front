import {Component, Input, OnInit} from '@angular/core';
import {Apprenant} from '../interfaces/apprenant';

@Component({
  selector: 'app-apprenant-card',
  templateUrl: './apprenant-card.component.html',
  styleUrls: ['./apprenant-card.component.css']
})
export class ApprenantCardComponent implements OnInit {

  private _apprenant: any;

  contructor() {
    this._apprenant = {} as Apprenant;
  }


  get apprenant(): Apprenant {
    return this._apprenant;
  }

  @Input()
  set apprenant(apprenant: Apprenant) {
    this._apprenant = apprenant;
  }


  ngOnInit() {
  }

}
