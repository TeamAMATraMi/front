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
 private _dataSource: MatTableDataSource<Seance>;
private _seance: Seance[];
private _cours: Cours[];
private tmp :string;

private _sites: Site[];
private presence:string;
private date: string;
private horaire: string;
private _groupes: Groupe[];

 private _groupesTemp: Groupe[];
private _displayedColumns = ['Matiere', 'Date', 'Horaire','Presences'];

  constructor(private _statistiquesService: StatistiquesService , private _sitesService: SitesService,private _coursService: CoursService, private _seancesService: SeancesService ,private _apprenantsService: ApprenantsService,  private _groupesService: GroupesService, private _presencesService: PresencesService, private _route: ActivatedRoute) {
    this._modifier$ = new EventEmitter<Apprenant>();
    this._apprenant = {} as Apprenant;
   this._seance = [];
   this._cours = [];
  }


  get apprenant(): Apprenant {
    return this._apprenant;
  }


get displayedColumns(): any {
    return this._displayedColumns;
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
 this._coursService.fetchFromGroup(this._apprenant.idGroupe).subscribe((cours: Cours[]) => { 
this._cours = cours;
this._cours.forEach(cour=>{
	cour.seances.forEach(seance=>{
	this._seance.push(seance);
});
 this._dataSource = new MatTableDataSource<Seance>(this._seance);
});
});
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
     

});
 

  }


 get cours(): Cours[] {
    return this._cours;
  }

  set cours(value: Cours[]) {
    this._cours = value;
  }

 get presences(): Presence[] {
    return this._presences;
  }

  set presences(value: Presence[]) {
    this._presences = value;
  }


 get groupes(): Groupe[] {
    return this._groupes;
  }

  set groupes(value: Groupe[]) {
    this._groupes = value;
  }



getMatiere(cours: Cours): string { 
  
 this._cours.forEach(cour=>{
    if(String(cour.id) === String(cours)){
    this.tmp=cour.matiere;
}
});

     return  this.tmp;
  }
 



  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this._dataSource.filter = filterValue;

  }

  modifier() {
    this._modifier$.emit(this._apprenant);
  }

 get dataSource(): MatTableDataSource<Seance> {
    return this._dataSource;
  }




getPresenceById(id: number): string {
   if(this._presences == null || this._presences.length ==0){
      this.presence=' ';
      }

else{
   this._presences.forEach(pres => {
      if(pres.idSeance== id && pres.present){
      this.presence='Present';
      }
   else if(pres.idSeance== id &&  !pres.present){
      this.presence='Absent';
      }
      });
   }

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
