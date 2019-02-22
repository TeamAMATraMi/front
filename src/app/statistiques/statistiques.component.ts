import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StatistiquesService} from '../shared/services/statistiques.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  public sexeLabels: string[] = ['Hommes', 'Femmes'];
  public sexeType = 'bar';
  public sexeLegend = false;
  public sexeData: any[] = [
    {data: []}
  ];
  public ageLabels: string[] = [];
  public ageType = 'doughnut';
  public ageData: number[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: false
  };
  constructor(private _statistiquesService: StatistiquesService, private _router: Router) {}

  ngOnInit() {
    this._statistiquesService.fetchBySexe().subscribe((stat: Map<String, number>) => {
        console.log(stat);
        this.sexeData = [{data: [stat['M'], stat['F']]}];
    });
    this._statistiquesService.fetchByAge().subscribe( (stat: Map<String, number>) => {
      console.log(stat);
      this.ageLabels = Object.getOwnPropertyNames(stat);
      this.ageData = Object.values(stat);
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

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
