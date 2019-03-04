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
  public sexeData: any[] = [
    {data: []}
  ];
  public ageLabels: string[] = [];
  public ageData: number[] = [];
  public nationaliteLabels: string[] = [];
  public nationaliteData: number[] = [];
  public siteLabels: string[] = [];
  public siteData: number[] = [];
  public sejourLabels: string[] = [];
  public sejourData: number[] = [];
  public niveauLangueLabels: string[] = [];
  public niveauLangueData: number[] = [];
  public niveauScolLabels: string[] = [];
  public niveauScolData: number[] = [];
  public quartierPrioLabels: string[] = [];
  public quartierPrioData: number[] = [];
  public bar = 'bar';
  public doughnut = 'doughnut';
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: false
  };
  public chartColors: any[] = [
    {
      backgroundColor: ['#FF7360', '#6FC8CE', '#FAFFF2', '#FFFCC4', '#B9E8E0', '#74B2F4',
                        '#BE74F4', '#F474A6', '#7474F4', '#74EEF4', '#F4BE74', '#CC045C', '#79EE4E', '#BABF7E']
    }];

  constructor(private _statistiquesService: StatistiquesService, private _router: Router) {}

  ngOnInit() {
    this._statistiquesService.fetchBySexe().subscribe((stat: Map<String, number>) => {
        console.log(stat);
        this.sexeData = [{data: [stat['M'], stat['F']]}];
    });
    this._statistiquesService.fetchByAge().subscribe( (stat: Map<String, number>) => {
      console.log(stat);
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.ageLabels.push(Object.keys(stat)[i]);
      }
      this.ageData = Object.values(stat);
    });

    this._statistiquesService.fetchBySite().subscribe((stat: Map<String, number>) => {
      console.log(stat);
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.siteLabels.push(Object.keys(stat)[i]);
      }
      this.siteData = Object.values(stat);
    });

    this._statistiquesService.fetchByNationalite('all').subscribe((stat: Map<String, number>) => {
      console.log(stat);
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);
      }
      this.nationaliteData = Object.values(stat);
    });

    this._statistiquesService.fetchBySejour('all').subscribe((stat: Map<String, number>) => {
      console.log(stat);
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

    this._statistiquesService.fetchByQuartierPrio('all').subscribe((stat: Map<String, number>) => {
      console.log(stat);
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });

    this._statistiquesService.fetchByNiveauScol('all').subscribe((stat: Map<number, number>) => {
        console.log(stat);
        for (let i = 0; i < Object.keys(stat).length; i++) {
          this.niveauScolLabels.push(Object.keys(stat)[i]);
        }
        this.niveauScolData = Object.values(stat);
    });

    this._statistiquesService.fetchByStatutPro('all').subscribe((stat: Map<String, number>) => {
        console.log(stat);
    });

    this._statistiquesService.fetchByPriseCharge('Stenay').subscribe((stat: Map<number, number>) => {
        console.log(stat);
    });

    this._statistiquesService.fetchByNiveauLangue('all').subscribe((stat: Map<String, number>) => {
        console.log(stat);
        for (let i = 0; i < Object.keys(stat).length; i++) {
          this.niveauLangueLabels.push(Object.keys(stat)[i]);
        }
        this.niveauLangueData = Object.values(stat);
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
