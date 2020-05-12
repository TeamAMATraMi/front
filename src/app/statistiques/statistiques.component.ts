import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StatistiquesService} from '../shared/services/statistiques.service';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {

  public sexeLabels: string[] = ['Hommes', 'Femmes'];
  public sexeData: any[] = [];
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
  public primoArrivantLabels: string[] = [];
  public primoArrivantData: number[] = [];
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
  private _sites: Site[];


  constructor(private _statistiquesService: StatistiquesService, private _sitesService: SitesService, private _router: Router) {}

  ngOnInit() {
    this._sitesService.fetch().subscribe((sites: Site[]) => this._sites = sites);
   
 this._statistiquesService.fetchBySexe().subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['M'], stat['F']];
    });

    this._statistiquesService.fetchByAge().subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.ageLabels.push(Object.keys(stat)[i]);
      }
      this.ageData = Object.values(stat);
    });

 this._statistiquesService.fetchByNationalite('all').subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);
      }
      this.nationaliteData = Object.values(stat);
    });

    this._statistiquesService.fetchBySite().subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.siteLabels.push(Object.keys(stat)[i]);
      }
      this.siteData = Object.values(stat);
    });

   

    this._statistiquesService.fetchBySejour('all').subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

    

    this._statistiquesService.fetchByNiveauScol('all').subscribe((stat: Map<number, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauScolLabels.push(Object.keys(stat)[i]);
      }
      this.niveauScolData = Object.values(stat);
    });

    
this._statistiquesService.fetchByQuartierPrio('all').subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });


    this._statistiquesService.fetchByNiveauLangue('all').subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauLangueLabels.push(Object.keys(stat)[i]);
      }
      this.niveauLangueData = Object.values(stat);
    });

    this._statistiquesService.fetchByPrimoArrivant().subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.primoArrivantLabels.push(Object.keys(stat)[i]);
      }
      this.primoArrivantData = Object.values(stat);
    });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


  public makePdf(){
	var data =document.getElementById('content');
    html2canvas(data).then(canvas => {
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('statistique.pdf'); // Generated PDF 
     
    });
  }

}
