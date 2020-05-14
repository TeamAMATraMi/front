import { Component, OnInit ,ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {filter, flatMap, map} from 'rxjs/operators';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PresenceDialogComponent} from '../../shared/dialogs/presence-dialog/presence-dialog.component';
import {PresencesService} from '../../shared/services/presences.service';
import {Presence} from '../../shared/interfaces/presence';
import {Seance} from '../../shared/interfaces/seance';
import {Apprenant} from '../../shared/interfaces/apprenant';
import {Cours} from '../../shared/interfaces/cours';
import {CoursService} from '../../shared/services/cours.service';
import {MatTableDataSource ,MatPaginator} from '@angular/material';
import {ApprenantsService} from '../../shared/services/apprenants.service';
import {SelectionModel} from '@angular/cdk/collections';
import {SeancesService} from '../../shared/services/seances.service';

@Component({
  selector: 'app-update-presence',
  templateUrl: './update-presence.component.html',
  styleUrls: ['./update-presence.component.css']
})
export class UpdatePresenceComponent implements OnInit {

  private _seance: Seance;
  private _dataSource: MatTableDataSource<Apprenant>;
  private _dataSourceSeance: MatTableDataSource<Seance>;
  private _dataSourcePrecense: MatTableDataSource<Presence>;
  private _cours: Cours;
  private _presences: Presence[];
  private _selection: SelectionModel<Apprenant>;
  displayedColumns: String[] = ['nom', 'present'];
  initialSelection: Apprenant[];

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private _route: ActivatedRoute, private _router: Router, private _presencesService: PresencesService,
              private _apprenantsService: ApprenantsService, private _coursService: CoursService, private _seancesService: SeancesService,
              private _dialog: MatDialog) {
      this._seance = {} as Seance;
      this._cours = {} as Cours;
      this._presences = [];
      this.initialSelection = [];
      this._selection = new SelectionModel<Apprenant>(true, this.initialSelection);
  }

  ngOnInit() {
      console.log('UpdatePresenceComponent', 'ngOnInit');
      this._route.params.subscribe((params: Params) => {
            const idCours = +params['idCours'];
            this._coursService.fetchOne(idCours).subscribe((cours: Cours) => {
                this._cours = cours;
                this._apprenantsService.fetchByGroup(this._cours.idGroupe).subscribe((apprenants: Apprenant[]) => {
                    this._dataSource = new MatTableDataSource<Apprenant>(apprenants);
                });
		
		
 });
	this._seancesService.fetchOne(params['id']).subscribe((seances: Seance) => {
               this._seance =seances;
 });

 });
	
            
  
this._presencesService.fetch().subscribe((presences: Presence[]) => {
	this._presences=presences;
});
     	
            
  }


  get dataSource(): MatTableDataSource<Apprenant> {
    return this._dataSource;
  }

  set dataSource(value: MatTableDataSource<Apprenant>) {
      this._dataSource = value;
  }

  get seance(): Seance {
      return this._seance;
  }

  set seance(value: Seance) {
      this._seance = value;
  }

  get cours(): Cours {
      return this._cours;
  }

  get presences(): Presence[] {
      return this._presences;
  }

  get selection(): SelectionModel<Apprenant> {
      return this._selection;
  }


    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected == numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(ref) {
	if(this.isSomeSelected()){
            this.selection.clear();
	    ref.checked=false;
}
	else{
	  this.isAllSelected()?
	 this.selection.clear():
            this.dataSource.data.forEach(row => this.selection.select(row));
		
    }
}

isSomeSelected(){
	return this.selection.selected.length >0;
}


   
    /** Validation des presences **/
    validatePresences() {
        // si on a pas de présence au prealable
        if(this._presences == null || this._presences.length == 0){
            this._dataSource.data.forEach(value => {
                    this._presencesService.create({
                        id: null,
                        date: this._seance.date,
                        idSeance: this._seance.id,
                        idApprenant: value.id,
                        present: this._selection.isSelected(value)
                    } as Presence).subscribe();
         
 });
        } 
	
	else { // on a deja des presences
            this._dataSource.data.forEach(value => {
		let create=true;
                    this._presences.forEach(presence => {
                    if (presence.idApprenant == value.id && presence.idSeance == this._seance.id && presence.date == this._seance.date ) {
                        create=false;
                        this._presencesService.update({
                            id: presence.id,
                            date:   this._seance.date,
                            idSeance:   this._seance.id,
                            idApprenant: value.id,
                            present: this._selection.isSelected(value)
                        } as Presence).subscribe();
                    }
});

		if(create){
		this._presencesService.create({
                        id: null,
                        date: this._seance.date,
                        idSeance: this._seance.id,
                        idApprenant: value.id,
                        present: this._selection.isSelected(value)
                    } as Presence).subscribe();


		}
		
                });
		
               
        }
        alert('Présences enregistrées');
	
	this._router.navigate(['/cours',this._cours.id]);
    }


}
