import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Formateur} from '../shared/interfaces/formateur';
import {Router} from '@angular/router';
import {FormateursService} from '../shared/services/formateurs.service';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {filter, flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {Groupe} from '../shared/interfaces/groupe';
import {GroupesService} from '../shared/services/groupes.service';
import {ExcelService} from '../shared/services/excel.service';
import {FormateurDialogComponent} from '../shared/dialogs/formateur-dialog/formateur-dialog.component';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.css']
})

export class FormateursComponent implements OnInit {

  private _displayedColumns = ['NomPrenom', 'Tel', 'Adresse', 'DeleteEdit'];
 
  private _formateur: Formateur;
  private data : any[];
  private readonly _delete$: EventEmitter<Formateur>;
  private siteId: number;

  private _formateurs: Formateur[];
  private _formateursTemp: Formateur[];
  private _sites: Site[];
  private _site: Site;
  private _groupesSite: Groupe[];
  private _groupes: Groupe[];
  private _selectedSiteId: number | string;
  private line : any[];
  private _dialogStatus: string;
  private _formateursDialog: MatDialogRef<FormateurDialogComponent>;
  private _dataSource: MatTableDataSource<Formateur>;
 


  value = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, private excelService:ExcelService ,private _formateursService: FormateursService, private _sitesService: SitesService,
              private _dialog: MatDialog, private _groupesService: GroupesService, private snackBar: MatSnackBar) {
    this._formateurs = [];
    this._formateursTemp = [];
    this._sites = [];
    this._dialogStatus = 'inactive';
    this._groupesSite = [];
    this._groupes = [];
    this._selectedSiteId = 'allSites';
    


  }

  ngOnInit() {
    this._formateursService.fetch().subscribe(formateurs => {
      this._dataSource = new MatTableDataSource<Formateur>(formateurs);
      this._formateurs = formateurs;
      this._formateursTemp = formateurs;
      this._dataSource.paginator = this.paginator;
      this._dataSource.sort = this.sort;
      this._dataSource.filterPredicate = (data: {nom: string, prenom: string}, filterValue: string) => {
        if ((data.nom.trim().toLowerCase().indexOf(filterValue) !== -1) || (data.prenom.trim().toLowerCase().indexOf(filterValue) !== -1)) {
          return true;
        } else {
          return false;
        }
      };
    });
    this._sitesService.fetch().subscribe((sites: Site[]) => this._sites = sites);
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => { this._groupes = groupes; this._groupesSite = this._groupes; });
    this.data=[];  
}

  get formateurs(): Formateur[] {
    return this._formateurs;
  }

  get sites(): Site[] {
    return this._sites;
  }

  set sites(value: Site[]) {
    this._sites = value;
  }

  get site(): Site {
    return this._site;
  }

  set site(value: Site) {
    this._site = value;
  }

  afficherFormateurs() {
    if (this._selectedSiteId === 'allSites') {
      this._formateurs = this._formateursTemp;
    } else {
      this._formateurs = this._formateursTemp;
      this._formateurs = this._formateurs.filter(e => e.idSite === this._selectedSiteId);
    }
    this._dataSource = new MatTableDataSource<Formateur>(this._formateurs);
    this._dataSource.paginator = this.paginator;
    this._dataSource.filterPredicate = (data: {nom: string, prenom: string}, filterValue: string) => {
      if ((data.nom.trim().toLowerCase().indexOf(filterValue) !== -1) || (data.prenom.trim().toLowerCase().indexOf(filterValue) !== -1)) {
        return true;
      } else {
        return false;
      }
    };
    this._dataSource.paginator.firstPage();
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  get dataSource(): MatTableDataSource<Formateur> {
    return this._dataSource;
  }

  showDialog() {
    // set formateur-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._formateursDialog = this._dialog.open(FormateurDialogComponent, {
      width: '800px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._formateursDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (formateurs: Formateur[]) => {
              this._formateurs = formateurs;
              this._dataSource = new MatTableDataSource<Formateur>(this._formateurs);
              this._dataSource.paginator = this.paginator;
            },
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  set groupes(value: Groupe[]) {
    this._groupes = value;
  }

  private _add(formateur: Formateur): Observable<Formateur[]> {
    this.addOpenSnackBar();
    return this._formateursService
        .create(formateur)
        .pipe(
            flatMap(_ => this._formateursService.fetch())
        );
  }

  @Input()
  set formateur(value: Formateur) {
    this._formateur = value;
  }

  @Output('deleteFormateur')
  get delete$(): EventEmitter<Formateur> {
    return this._delete$;
  }

  delete(id: number) {
    this._formateursService.delete(id).subscribe(null, null, () => this.ngOnInit());
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this._dataSource.filter = filterValue;
    this._dataSource.paginator.firstPage();
  }

  deleteConfirmation(id: number) {
    if (confirm('Voulez vous vraiment supprimer ce formateur ?')) {
      this.delete(id);
      this.deleteOpenSnackBar();
    }
  }

  get selectedSiteId(): number | string {
    return this._selectedSiteId;
  }

  set selectedSiteId(value: number | string) {
    this._selectedSiteId = value;
  }

 sortData(sort: Sort) {
    const data = this._dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this._dataSource.data = data;
      return;
    }

    this._dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'NomPrenom': return compare(a.nom, b.nom, isAsc);
        default: return 0;
      }
    });
  }

  addOpenSnackBar() {
    this.snackBar.open('Ajout effectué avec succés', 'OK', {
      duration: 3000
    });
  }

  deleteOpenSnackBar() {
    this.snackBar.open('suppression effectué', 'OK', {
      duration: 3000
    });
  }

/**
*Function downloadFomateursExcel qui export la liste des formateurs en fichier excel
**/
downloadFomateursExcel(){
this.data=[];
this.line=[];
var salair
this._formateurs.forEach(formateur => {
	var siteF='';
	this._sites.forEach(site => {
	if(site.id==formateur.idSite ){
		siteF=site.ville;
	}
});

//Affichage de boolean
if(formateur.salarie==false){
   salair='Non';
}
else{
salair='Oui';
}
		
	this.data = this.data.concat({
	  Nom: formateur.nom,
	  Prenom: formateur.prenom,	 
	  Telephone: formateur.telephone,
	  Adresse: formateur.adresse,
	  CodePostal: formateur.codePostal,
	  Commune: formateur.commune,
	  Salarie: salair,
	  site : siteF


});
});




this.excelService.exportAsExcelFile(this.data, 'ListeFormateurs');

}


/**
*Function onFileChange qui importe la liste des formateurs depuis un  fichier excel
**/
onFileChange(event: any) {
    var salair;
   
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}

Object.keys(data).forEach(k =>{
this._sitesService.exist(data[k]['site']).subscribe((existRes:boolean)=>{
if(existRes==false){
this._sitesService.create({
			 id: null,
                        ville:data[k]['site']
 } as Site).subscribe();
}
});


this._formateursService.exist(data[k]['Nom'],data[k]['Prenom']).subscribe((res:boolean) => {
//check si le site existe 
if(res==false){

//pour boolean
if(data[k]['Salarie']=='Non' || data[k]['Salarie']=='non' || data[k]['Salarie']=='NON' || data[k]['Salarie']==''){
   salair=false;
}
else{
salair=true;
}



//Recupere l'id du site depuis la ville
this._sitesService.getIdByVille(data[k]['site']).subscribe((resVille:number) => {
this.siteId=resVille;
this._formateursService.create({
          id: null,
          idSite:this.siteId,
	  nom: data[k]['Nom'],
	  prenom :data[k]['Prenom'],
	  telephone : data[k]['Telephone'],    
	  adresse: data[k]['Adresse'],
          codePostal: data[k]['CodePostal'],
   	  commune: data[k]['site'],
   	  salarie: salair,

    
 } as Formateur).subscribe();
}); 

    }
    

this._formateursService.fetch().subscribe(formateurs => {
      this._dataSource = new MatTableDataSource<Formateur>(formateurs);
      this._formateurs = formateurs;
      this._formateursTemp = formateurs;
      this._dataSource.paginator = this.paginator;
      this._dataSource.sort = this.sort;
      this._dataSource.filterPredicate = (data: {nom: string, prenom: string}, filterValue: string) => {
        if ((data.nom.trim().toLowerCase().indexOf(filterValue) !== -1) || (data.prenom.trim().toLowerCase().indexOf(filterValue) !== -1)) {
          return true;
        } else {
          return false;
        }
      };
    });
console.log(this._dataSource);
});

});
   

}
 }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
