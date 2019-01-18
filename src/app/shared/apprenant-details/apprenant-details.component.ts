import {Component, Input, OnInit} from '@angular/core';
import {Apprenant} from '../interfaces/apprenant';

@Component({
  selector: 'app-apprenant-details',
  templateUrl: './apprenant-details.component.html',
  styleUrls: ['./apprenant-details.component.css']
})
export class ApprenantDetailsComponent implements OnInit {

  private _apprenant: Apprenant;

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
