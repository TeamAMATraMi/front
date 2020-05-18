import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apprenant} from '../../interfaces/apprenant';
import {StatistiquesService} from '../../services/statistiques.service';
import {ApprenantsService} from '../../services/apprenants.service';
import {ActivatedRoute, Params} from '@angular/router';
import {PresencesService} from '../../services/presences.service';
import {SeancesService} from '../../services/seances.service';
import {Presence} from '../../interfaces/presence';
import {MatTableDataSource} from '@angular/material';
import {Seance} from '../../interfaces/seance';
import {Cours} from '../../interfaces/cours';
import {CoursService} from '../../services/cours.service';
import {Groupe} from '../../interfaces/groupe';
import {GroupesService} from '../../services/groupes.service';
import {formatDate} from '@angular/common';

import {Site} from '../../interfaces/site';
import {SitesService} from '../../services/sites.service';

@Component({
  selector: 'app-apprenant-details',
  templateUrl: './apprenant-details.component.html',
  styleUrls: ['./apprenant-details.component.css']
})
export class ApprenantDetailsComponent implements OnInit {


  public sexeLabels: string[] = ['Present', 'Absent'];
  public sexeData: any[] = [];
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
  private _apprenant: Apprenant;
  private readonly _modifier$: EventEmitter<Apprenant>;
private _presences: Presence[];
 private _dataSource: MatTableDataSource<Groupe>;
private _seance: Seance[];
private _cours: Cours[];
private _sites: Site[];
private tmp: string;
private presence:string;
private date: string;
private horaire: string;
private _groupes: Groupe[];
  
 private _groupesTemp: Groupe[];
private _displayed = ['Matiere', 'Date', 'Horaire','Presences'];

  constructor(private _statistiquesService: StatistiquesService , private _sitesService: SitesService,private _coursService: CoursService, private _seancesService: SeancesService ,private _apprenantsService: ApprenantsService,  private _groupesService: GroupesService, private _presencesService: PresencesService, private _route: ActivatedRoute) {
    this._modifier$ = new EventEmitter<Apprenant>();
    this._apprenant = {} as Apprenant;
	this._seance = [];
	this._cours = [];
  }


  get apprenant(): Apprenant {
    return this._apprenant;
  }
get displayed(): any {
    return this._displayed;
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
this._route.params.subscribe((params: Params) => {
              this._apprenantsService.fetchOne(params['id']).subscribe((apprenant: Apprenant) => {
                this._apprenant = apprenant;	
this._statistiquesService.fetchByPresences(this._apprenant.id).subscribe((stat: Map<String, number>) => {
      this.sexeData = [stat['Present'], stat['Absent']];
	
    });
 });
 });
this._presencesService.fetch().subscribe((presences: Presence[]) => {
	this._presences=presences;
});
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => {
      this._groupes = groupes;
      this._dataSource = new MatTableDataSource<Groupe>(this._groupes);      
     this._coursService.fetch().subscribe((cours: Cours[]) => { this._cours = cours; 
}); 
}); 

  }

  
getMatiereById(id: number): string {
    this._cours.forEach(s => {
      if (s.idGroupe === id && this._apprenant.idGroupe== id ) {
        this.tmp = s.matiere;
      }
    });
    return this.tmp;
  }


getHoraireById(id: number): string {
	 
      this._cours.forEach(s => {	
   if (s.idGroupe === id && this._apprenant.idGroupe== id){
	s.seances.forEach(seance=>{
	 this.horaire =seance.horaire.toString(); 
});
}
});  
 
     return this.horaire;
  }




  modifier() {
    this._modifier$.emit(this._apprenant);
  }

 get dataSource(): MatTableDataSource<Groupe> {
    return this._dataSource;
  }

  


 getDateByIdFor(id: number): string {
 this._cours.forEach(s => {	
   if (s.idGroupe === id && this._apprenant.idGroupe== id){
	s.seances.forEach(seance=>{
	 this.date =seance.date.toString(); 
});
}
}); 
 
     return this.date;
   
  }


getPresenceByIdFor(id: number): string {
 this._cours.forEach(s => {	
   if (s.idGroupe === id && this._apprenant.idGroupe== id){
	s.seances.forEach(seance=>{
  	 if(this._presences == null || this._presences.length ==0){
		this.presence=' ';
		}

else{
	this._presences.forEach(pres => {
		if(pres.idSeance== seance.id && this._apprenant.id == pres.idApprenant && pres.present){
		this.presence='Present';
		}
	else if(pres.idSeance== seance.id && this._apprenant.id == pres.idApprenant && !pres.present){
		this.presence='Absent';
		}
		});
	}
	  
	});
}
}); 
      return this.presence;
   
  }

	 // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
