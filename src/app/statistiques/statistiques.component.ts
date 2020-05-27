import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import {StatistiquesService} from '../shared/services/statistiques.service';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {formatDate} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GroupesService} from '../shared/services/groupes.service';
import {Groupe} from '../shared/interfaces/groupe';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';

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
  public nationaliteDataTmp: any[] = [];
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
  private _groupesSite: Groupe[];
  private  _groupes: Groupe[];
  private _apprenant: Apprenant[];

  private _selectedSiteId: number | string;
 private readonly _form: FormGroup;

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


  constructor(private _statistiquesService: StatistiquesService,private _apprenantsService: ApprenantsService, private _groupesService: GroupesService, private _sitesService: SitesService, private _router: Router) {
   this._form = this._buildForm();
	this._selectedSiteId = 'allSites';
	 this._groupesSite = [];
this._groupes = [];
}

  ngOnInit() {

    this._sitesService.fetch().subscribe((sites: Site[]) => this._sites = sites);
this._apprenantsService.fetch().subscribe((apprenants: Apprenant[]) => this._apprenant=apprenants );
     this._groupesService.fetch().subscribe((groupes: Groupe[]) => { this._groupes = groupes; this._groupesSite = this._groupes; });
  
   
 this._statistiquesService.fetchBySexe('all',1,1).subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['M'], stat['F']];
    });

    this._statistiquesService.fetchByAge('all',1,1).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.ageLabels.push(Object.keys(stat)[i]);
      }
      this.ageData = Object.values(stat);
    });


 this._statistiquesService.fetchByNationalite('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);
      }
      this.nationaliteData = Object.values(stat);
    });



    this._statistiquesService.fetchBySite('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.siteLabels.push(Object.keys(stat)[i]);
      }
      this.siteData = Object.values(stat);
    });

   

    this._statistiquesService.fetchBySejour('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

    

    this._statistiquesService.fetchByNiveauScol('all',1,1).subscribe((stat: Map<number, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauScolLabels.push(Object.keys(stat)[i]);
      }
      this.niveauScolData = Object.values(stat);
    });

    
this._statistiquesService.fetchByQuartierPrio('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });


    this._statistiquesService.fetchByNiveauLangue('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauLangueLabels.push(Object.keys(stat)[i]);
      }
      this.niveauLangueData = Object.values(stat);
    });

    this._statistiquesService.fetchByPrimoArrivant('all',1,1).subscribe( (stat: Map<String, number>) => {
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

get form(): FormGroup {
    return this._form;
  }

afficherStats() {
this.nationaliteData.length=0;
this.ageData.length=0;
this.siteData.length=0;
this.sejourData.length=0;
this.niveauScolData.length=0;
this.quartierPrioData.length=0;
this.niveauLangueData.length=0;
this.quartierPrioData.length=0;
this.primoArrivantData.length=0;

this.nationaliteLabels.length=0;
this.ageLabels.length=0;
this.siteLabels.length=0;
this.sejourLabels.length=0;
this.niveauScolLabels.length=0;
this.quartierPrioLabels.length=0;
this.niveauLangueLabels.length=0;
this.quartierPrioLabels.length=0;
this.primoArrivantLabels.length=0;



    this._groupesSite = [];
    this._groupes.forEach(e => {
      if (this._selectedSiteId === 'allSites') {
        this._groupesSite.push(e);
      } else {
        if (e.idSite === this._selectedSiteId) {
          this._groupesSite.push(e);
        }
      }
    });

 if (this._selectedSiteId === 'allSites') {
	if(this._form.value.debutDate==''){

 this._statistiquesService.fetchBySite('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.siteLabels.push(Object.keys(stat)[i]);
      }
      this.siteData = Object.values(stat);
    });


//Repartition Sexe  tout les sites 
this._statistiquesService.fetchBySexe('all',1,1).subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['M'], stat['F']];
    });

//Repartition Primo  tout les sites 
this._statistiquesService.fetchByPrimoArrivant('all',1,1).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.primoArrivantLabels.push(Object.keys(stat)[i]);
      }
      this.primoArrivantData = Object.values(stat);
    });


//Repartition Age  tout les sites 
 this._statistiquesService.fetchByAge('all',1,1).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.ageLabels.push(Object.keys(stat)[i]);
      }
      this.ageData = Object.values(stat);
    });
  
        
//Repartition nationalité pour tout les sites
       this._statistiquesService.fetchByNationalite('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);
      }
      this.nationaliteData = Object.values(stat);
    });

//Repartition Sejour pour tout le site selectionné  

  this._statistiquesService.fetchBySejour('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

//Repartition Niveau scolaire pour tout les sites
 
this._statistiquesService.fetchByNiveauScol('all',1,1).subscribe((stat: Map<number, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauScolLabels.push(Object.keys(stat)[i]);
      }
      this.niveauScolData = Object.values(stat);
    });


//Repartition quartier Prioritaire pour tout les sites   
this._statistiquesService.fetchByQuartierPrio('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });


//Repartition niveau langue pour tout les sites 
 this._statistiquesService.fetchByNiveauLangue('all',1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauLangueLabels.push(Object.keys(stat)[i]);
      }
      this.niveauLangueData = Object.values(stat);
    });


}


else{

this._statistiquesService.fetchBySite('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.siteLabels.push(Object.keys(stat)[i]);
      }
      this.siteData = Object.values(stat);
    });


//Repartition Sexe  tout les sites 
this._statistiquesService.fetchBySexe('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['M'], stat['F']];
    });

//Repartition Primo  tout les sites 
this._statistiquesService.fetchByPrimoArrivant('all',this._form.value.debutDate,this._form.value.finDate).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.primoArrivantLabels.push(Object.keys(stat)[i]);
      }
      this.primoArrivantData = Object.values(stat);
    });


//Repartition Age  tout les sites 
 this._statistiquesService.fetchByAge('all',this._form.value.debutDate,this._form.value.finDate).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.ageLabels.push(Object.keys(stat)[i]);
      }
      this.ageData = Object.values(stat);
    });
  

//Repartition nationalité pour tout les sites
       this._statistiquesService.fetchByNationalite('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);
      }
      this.nationaliteData = Object.values(stat);
    });



//Repartition Sejour pour tout le site selectionné  

  this._statistiquesService.fetchBySejour('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

//Repartition Niveau scolaire pour tout les sites
 
this._statistiquesService.fetchByNiveauScol('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<number, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauScolLabels.push(Object.keys(stat)[i]);
      }
      this.niveauScolData = Object.values(stat);
    });


//Repartition quartier Prioritaire pour tout les sites   
this._statistiquesService.fetchByQuartierPrio('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });


//Repartition niveau langue pour tout les sites 
 this._statistiquesService.fetchByNiveauLangue('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauLangueLabels.push(Object.keys(stat)[i]);
      }
      this.niveauLangueData = Object.values(stat);
    });


    }

  } 
    
 else {
 this._sites.forEach(e => {
      if (e.id === this._selectedSiteId) {
	if(this._form.value.debutDate==''){
  
//Repartition Nationalité  tout le site selectionné     
 this._statistiquesService.fetchByNationalite(e.ville,1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);
      }
      this.nationaliteData = Object.values(stat);
    });

//Repartition Age le site selectionné
 this._statistiquesService.fetchByAge(e.ville,1,1).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.ageLabels.push(Object.keys(stat)[i]);
      }
      this.ageData = Object.values(stat);
    });
  
//Repartition Primo  pout le site selectionné
this._statistiquesService.fetchByPrimoArrivant(e.ville,1,1).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.primoArrivantLabels.push(Object.keys(stat)[i]);
      }
      this.primoArrivantData = Object.values(stat);
    });


 this._statistiquesService.fetchBySite(e.ville,1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.siteLabels.push(Object.keys(stat)[i]);
      }
      this.siteData = Object.values(stat);
    });



//Repartition Sejour pour  le site selectionné  

 this._statistiquesService.fetchBySejour(e.ville,1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

//Repartition quaetier Prioritaire pour le site selectionné  

this._statistiquesService.fetchByQuartierPrio(e.ville,1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });


//Repartition Sexe   le site selectionné 
this._statistiquesService.fetchBySexe(e.ville,1,1).subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['M'], stat['F']];
    });
  

//Repartition niveau langue pour tout les sites 
 this._statistiquesService.fetchByNiveauLangue(e.ville,1,1).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauLangueLabels.push(Object.keys(stat)[i]);
      }
      this.niveauLangueData = Object.values(stat);
    });

//Repartition Niveau scolaire  le site selectionné 
  
this._statistiquesService.fetchByNiveauScol(e.ville,1,1).subscribe((stat: Map<number, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauScolLabels.push(Object.keys(stat)[i]);
      }
      this.niveauScolData = Object.values(stat);
    });

  
 
}

else{

//Repartition Nationalité  tout le site selectionné     
 this._statistiquesService.fetchByNationalite(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);
      }
      this.nationaliteData = Object.values(stat);
    });

//Repartition Age le site selectionné
 this._statistiquesService.fetchByAge(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.ageLabels.push(Object.keys(stat)[i]);
      }
      this.ageData = Object.values(stat);
    });
  
//Repartition Primo  pout le site selectionné
this._statistiquesService.fetchByPrimoArrivant(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.primoArrivantLabels.push(Object.keys(stat)[i]);
      }
      this.primoArrivantData = Object.values(stat);
    });


 this._statistiquesService.fetchBySite(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.siteLabels.push(Object.keys(stat)[i]);
      }
      this.siteData = Object.values(stat);
    });



//Repartition Sejour pour  le site selectionné  

 this._statistiquesService.fetchBySejour(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

//Repartition quaetier Prioritaire pour le site selectionné  

this._statistiquesService.fetchByQuartierPrio(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });


//Repartition Sexe   le site selectionné 
this._statistiquesService.fetchBySexe(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['M'], stat['F']];
    });
  

//Repartition niveau langue pour tout les sites 
 this._statistiquesService.fetchByNiveauLangue(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauLangueLabels.push(Object.keys(stat)[i]);
      }
      this.niveauLangueData = Object.values(stat);
    });

//Repartition Niveau scolaire  le site selectionné 
  
this._statistiquesService.fetchByNiveauScol(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<number, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauScolLabels.push(Object.keys(stat)[i]);
      }
      this.niveauScolData = Object.values(stat);
    });

     }

}

   });

}



}

submit(){
this.nationaliteData.length=0;
this.ageData.length=0;
this.siteData.length=0;
this.sejourData.length=0;
this.niveauScolData.length=0;
this.quartierPrioData.length=0;
this.niveauLangueData.length=0;
this.quartierPrioData.length=0;
this.primoArrivantData.length=0;

this.nationaliteLabels.length=0;
this.ageLabels.length=0;
this.siteLabels.length=0;
this.sejourLabels.length=0;
this.niveauScolLabels.length=0;
this.quartierPrioLabels.length=0;
this.niveauLangueLabels.length=0;
this.quartierPrioLabels.length=0;
this.primoArrivantLabels.length=0;

if (this._selectedSiteId === 'allSites') {
	

  this._statistiquesService.fetchByNationalite('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
	for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);	
	
      }
	this.nationaliteData=Object.values(stat);     
    });

this._statistiquesService.fetchBySexe('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['M'], stat['F']];
    });

    this._statistiquesService.fetchByAge('all',this._form.value.debutDate,this._form.value.finDate).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.ageLabels.push(Object.keys(stat)[i]);
      }
      this.ageData = Object.values(stat);
    });



    this._statistiquesService.fetchBySite('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.siteLabels.push(Object.keys(stat)[i]);
      }
      this.siteData = Object.values(stat);
    });

   

    this._statistiquesService.fetchBySejour('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

    

    this._statistiquesService.fetchByNiveauScol('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<number, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauScolLabels.push(Object.keys(stat)[i]);
      }
      this.niveauScolData = Object.values(stat);
    });

    
this._statistiquesService.fetchByQuartierPrio('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });


    this._statistiquesService.fetchByNiveauLangue('all',this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauLangueLabels.push(Object.keys(stat)[i]);
      }
      this.niveauLangueData = Object.values(stat);
    });

    this._statistiquesService.fetchByPrimoArrivant('all',this._form.value.debutDate,this._form.value.finDate).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.primoArrivantLabels.push(Object.keys(stat)[i]);
      }
      this.primoArrivantData = Object.values(stat);
    });
	
}

else {
 this._sites.forEach(e => {
      if (e.id === this._selectedSiteId) {

 this._statistiquesService.fetchByNationalite(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.nationaliteLabels.push(Object.keys(stat)[i]);
	
	
      }
	this.nationaliteData=Object.values(stat);
      
    });

this._statistiquesService.fetchBySexe(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['M'], stat['F']];
    });

    this._statistiquesService.fetchByAge(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.ageLabels.push(Object.keys(stat)[i]);
      }
      this.ageData = Object.values(stat);
    });



    this._statistiquesService.fetchBySite(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.siteLabels.push(Object.keys(stat)[i]);
      }
      this.siteData = Object.values(stat);
    });

   

    this._statistiquesService.fetchBySejour(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.sejourLabels.push(Object.keys(stat)[i]);
      }
      this.sejourData = Object.values(stat);
    });

    

    this._statistiquesService.fetchByNiveauScol(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<number, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauScolLabels.push(Object.keys(stat)[i]);
      }
      this.niveauScolData = Object.values(stat);
    });

    
this._statistiquesService.fetchByQuartierPrio(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.quartierPrioLabels.push(Object.keys(stat)[i]);
      }
      this.quartierPrioData = Object.values(stat);
    });


    this._statistiquesService.fetchByNiveauLangue(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe((stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.niveauLangueLabels.push(Object.keys(stat)[i]);
      }
      this.niveauLangueData = Object.values(stat);
    });

    this._statistiquesService.fetchByPrimoArrivant(e.ville,this._form.value.debutDate,this._form.value.finDate).subscribe( (stat: Map<String, number>) => {
      for (let i = 0; i < Object.keys(stat).length; i++) {
        this.primoArrivantLabels.push(Object.keys(stat)[i]);
      }
      this.primoArrivantData = Object.values(stat);
    });


}
});


}

}
 get sites(): Site[] {
    return this._sites;
  }
get selectedSiteId(): number | string {
    return this._selectedSiteId;
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  get groupesSites(): Groupe[] {
    return this._groupesSite;
  }

  set selectedSiteId(value: number | string) {
    this._selectedSiteId = value;
  }


 private _buildForm(): FormGroup {
    return new FormGroup({finDate: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.compose([
      ])), debutDate: new FormControl('', Validators.compose([
      ]))
 });
  }

}
