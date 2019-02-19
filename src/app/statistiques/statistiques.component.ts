import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StatistiquesService} from '../shared/services/statistiques.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  constructor(private _statistiquesService: StatistiquesService, private _router: Router) { }

  ngOnInit() {
    this._statistiquesService.fetchBySexe().subscribe((stat: Map<String, number>) => {
        console.log(stat);
    });

    this._statistiquesService.fetchByAge().subscribe((stat: Map<String, number>) => {
      console.log(stat);
    });

    this._statistiquesService.fetchBySite().subscribe((stat: Map<String, number>) => {
      console.log(stat);
    });

    this._statistiquesService.fetchByNationalite('all').subscribe((stat: Map<String, number>) => {
      console.log(stat);
    });

    this._statistiquesService.fetchBySejour('Stenay').subscribe((stat: Map<String, number>) => {
      console.log(stat);
    });

    this._statistiquesService.fetchByQuartierPrio('all').subscribe((stat: Map<String, number>) => {
      console.log(stat);
    });

    this._statistiquesService.fetchByNiveauScol('all').subscribe((stat: Map<number, number>) => {
        console.log(stat);
    });

    this._statistiquesService.fetchByStatutPro('all').subscribe((stat: Map<String, number>) => {
        console.log(stat);
    });

    this._statistiquesService.fetchByPriseCharge('Stenay').subscribe((stat: Map<number, number>) => {
        console.log(stat);
    });

    this._statistiquesService.fetchByNiveauLangue('all').subscribe((stat: Map<String, number>) => {
        console.log(stat);
    });
  }

}
