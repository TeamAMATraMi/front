import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Cours} from '../../interfaces/cours';
import {Presence} from '../../interfaces/presence';
import {filter, flatMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';
import {PresencesService} from '../../services/presences.service';
import {Seance} from '../../interfaces/seance';
import {MatTableDataSource} from '@angular/material';
import {CoursService} from '../../services/cours.service';
import {SeancesService} from '../../services/seances.service';
import {Apprenant} from '../../interfaces/apprenant';
import {ApprenantsService} from '../../services/apprenants.service';
import {formatDate} from '@angular/common';
import {ExcelService} from '../../services/excel.service';

declare const require: any;
const jsPDF = require('jspdf');

@Component({
  selector: 'app-cour-details',
  templateUrl: './cour-details.component.html',
  styleUrls: ['./cour-details.component.css']
})
export class CourDetailsComponent implements OnInit {

  private _cour: Cours;
  private _courApprenants: Apprenant[];
  private _seance : Seance[];
  private _presences: Presence[];
  private readonly _modifier$: EventEmitter<Cours>;
  private _dataSource: MatTableDataSource<Seance>;
  private data : any[];
  
  displayedColumns: string[] = ['date', 'horaire', 'modif'];
  private seance : string;
 



  constructor(private _presencesService: PresencesService, private _seancesService: SeancesService ,
              private _apprenantsService: ApprenantsService, private excelService:ExcelService ,private _route: ActivatedRoute, private _coursService: CoursService) {
    this._modifier$ = new EventEmitter<Cours>();
    this._cour = {} as Cours;
    this._presences = [];
	this._courApprenants = [];
	this.data=[];
  }

  get cour(): Cours {
    return this._cour;
  }

  get dataSource(): MatTableDataSource<Seance> {
    return this._dataSource;
  }



  @Input()
  set cours(value: any) {
    console.log(this._cour);
    this._cour = value;
    console.log(this._cour);
    this.ngOnInit();
  }

  get presences(): Presence[] {
    return this._presences;
  }

  set presences(value: Presence[]) {
    this._presences = value;
  }

  @Output('modifier')
  get modifier$(): EventEmitter<Cours> {
    return this._modifier$;
  }

  deleteConfirmation(id: number) {
    if (confirm('Voulez vous vraiment supprimer cette séance ?')) {
      this.delete(id);
    }
  }

  ngOnInit() {
    this._route.params
        .subscribe(
            (params: Params) => {
              const id = +params['id'];
              this._coursService.fetchOne(id).subscribe((cours: Cours) => {
                this._cour = cours;
                this._dataSource = new MatTableDataSource<Seance>(this._cour.seances);
                console.log(this._dataSource);
                this._apprenantsService.fetchByGroup(cours.idGroupe)
                    .subscribe((apprenants: Apprenant[]) => {
                      this._courApprenants = apprenants;
                          });
              });
            }
        );

    
   this._presencesService.fetch().subscribe((presences: Presence[]) => {
	this._presences=presences;
});

  
  
  }

  modifier() {
    this._modifier$.emit(this._cour);
  }

  private delete(id: number) {
    this._seancesService.delete(id).subscribe(null, null, () => this.ngOnInit());
  }

  downloadPDFPresence() {
    const SESSION_CELL_MAX_CHARACTERS = 20;
    const SESSION_CELL_WIDTH = 28;
    if (!this._cour || !this._courApprenants || this._courApprenants.length < 1) {
      alert('Impossible de trouver le cours ou les participants... Veuillez réessayer.')
      return;
    }

 
  

    
    this._coursService.fetchOne(this._cour.id).subscribe((cour: Cours) =>{
      const doc = new jsPDF();
      const apprenantsRows = [];
      this._courApprenants.forEach(apprenant => {
        const cols = [];
        cols.push(apprenant.prenom + ' ' + apprenant.nom.toUpperCase());
       cour.seances.forEach(c => {
	if(this.presences == null || this.presences.length ==0){
		cols.push(' ');
}
else{
	this._presences.forEach(presence => {
		if(presence.present == false && c.id == presence.idSeance && apprenant.id == presence.idApprenant) {
		cols.push('Absent');
}
	else if(presence.present == true && c.id == presence.idSeance && apprenant.id == presence.idApprenant){
	cols.push('Present');

}

});
}




});              
        apprenantsRows.push(cols);

      });
      const header = ['Apprenant'];
      const ownColumnStyles = {
        0: {
          cellWidth: 'auto'
        }
      };
      var index = 1;
      cour.seances.forEach(seance => {
        console.log("seance : ",seance);
        var columnName = (!!seance.date? formatDate(seance.date,'dd/MM/yyyy', 'en-US') + ' ' : ' ') + (!!seance.horaire ? seance.horaire : '');
        if(columnName.length + 3 > SESSION_CELL_MAX_CHARACTERS) {
          columnName = columnName.substring(0, SESSION_CELL_MAX_CHARACTERS - 3) + '...';
        }
        header.push(columnName);
        ownColumnStyles[index++] = {cellWidth: SESSION_CELL_WIDTH};
      });
      doc.autoTable({
        showHead: 'everyPage',
        theme: 'grid',
        headStyles: {
          fillColor: [255, 255, 255],
          fontStyle: 'bold',
          textColor: [0, 0, 0]
        },
        columnStyles: ownColumnStyles,
        head: [
          [
            {content: ''},
            {
              content: 'Cours ' + this._cour.matiere,
              colSpan: (header.length - 1)
            }
          ],
          header],
        body: apprenantsRows,
      });


      // Save the PDF
      doc.save('Présences_' + Date.now() + '.pdf');

 
        });
  }




downloadFeuilleEmargement() {
    const SESSION_CELL_MAX_CHARACTERS = 20;
    const SESSION_CELL_WIDTH = 28;
    if (!this._cour || !this._courApprenants || this._courApprenants.length < 1) {
      alert('Impossible de trouver le cours ou les participants... Veuillez réessayer.')
      return;
    }

 
  

    
    this._coursService.fetchOne(this._cour.id).subscribe((cour: Cours) =>{
      const doc = new jsPDF();
      const apprenantsRows = [];
      this._courApprenants.forEach(apprenant => {
        const cols = [];
        cols.push(apprenant.prenom + ' ' + apprenant.nom.toUpperCase());
       cour.seances.forEach(c => {
	
		cols.push(' ');

});              
        apprenantsRows.push(cols);

      });
      const header = ['Apprenant'];
      const ownColumnStyles = {
        0: {
          cellWidth: 'auto'
        }
      };
      var index = 1;
      cour.seances.forEach(seance => {
        console.log("seance : ",seance);
        var columnName = (!!seance.date? formatDate(seance.date,'dd/MM/yyyy', 'en-US') + ' ' : ' ') + (!!seance.horaire ? seance.horaire : '');
        if(columnName.length + 3 > SESSION_CELL_MAX_CHARACTERS) {
          columnName = columnName.substring(0, SESSION_CELL_MAX_CHARACTERS - 3) + '...';
        }
        header.push(columnName);
        ownColumnStyles[index++] = {cellWidth: SESSION_CELL_WIDTH};
      });
      doc.autoTable({
        showHead: 'everyPage',
        theme: 'grid',
        headStyles: {
          fillColor: [255, 255, 255],
          fontStyle: 'bold',
          textColor: [0, 0, 0]
        },
        columnStyles: ownColumnStyles,
        head: [
          [
            {content: ''},
            {
              content: 'Cours ' + this._cour.matiere,
              colSpan: (header.length - 1)
            }
          ],
          header],
        body: apprenantsRows,
      });
 

      // Save the PDF
      doc.save('Présences_' + Date.now() + '.pdf');

 
        });
  }










downloadFeuilleEmargementExcel(){
this.data=[];
  	this.cour.seances.forEach(seance => {
		this._courApprenants.forEach(apprenant => {		
		this.data = this.data.concat({
		Nom : apprenant.nom,
		Prenom :apprenant.prenom,
		Matiere : this.cour.matiere,
		Date :seance.date,
		Horaire :seance.horaire,
		Presences: ' '	       
	      });
 		});
});
		

this.cour.seances.forEach(seance => {
		this._courApprenants.forEach(apprenant => {

if(this.data.find(ob=> ob['Date']==seance.date && ob['Nom']==apprenant.nom && ob['Prenom']==apprenant.prenom)==null){
this.data = this.data.concat({
		Nom : apprenant.nom,
		Prenom :apprenant.prenom,
		Matiere : this.cour.matiere,
		Date :seance.date,
		Horaire :seance.horaire,
		Presences: '  '
	       
	      });
}

});
		
	 
		});

	
	      // Save the PDF
	     this.excelService.exportAsExcelFile(this.data, 'Gestionpresences');
	
	    
	  }      
	
	    


downloadGestionExcel(){
this.data=[];
  	this.cour.seances.forEach(seance => {
		this._courApprenants.forEach(apprenant => {		
if(this.presences != null || this.presences.length !=0){		
	this._presences.forEach(presence => {
		if(presence.present == false && seance.id == presence.idSeance && apprenant.id == presence.idApprenant) {
		this.data = this.data.concat({
		Nom : apprenant.nom,
		Prenom :apprenant.prenom,
		Matiere : this.cour.matiere,
		Date :seance.date,
		Horaire :seance.horaire,
		Presences: 'Absent'	       
	      });
		}

	else if(presence.present == true && seance.id == presence.idSeance && apprenant.id == presence.idApprenant){
	this.data = this.data.concat({
		Nom : apprenant.nom,
		Prenom :apprenant.prenom,
		Matiere : this.cour.matiere,
		Date :seance.date,
		Horaire :seance.horaire,
		Presences: 'Present '
	       
	      });
}
 });
}
 		});
		
	 
		});

this.cour.seances.forEach(seance => {
		this._courApprenants.forEach(apprenant => {

if(this.data.find(ob=> ob['Date']==seance.date && ob['Nom']==apprenant.nom && ob['Prenom']==apprenant.prenom)==null){
this.data = this.data.concat({
		Nom : apprenant.nom,
		Prenom :apprenant.prenom,
		Matiere : this.cour.matiere,
		Date :seance.date,
		Horaire :seance.horaire,
		Presences: '  '
	       
	      });
}

});
		
	 
		});

	
	      // Save the PDF
	     this.excelService.exportAsExcelFile(this.data, 'Gestionpresences');
	
	    
	  }




}
