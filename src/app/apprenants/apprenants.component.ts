import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {Router} from '@angular/router';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {GroupesService} from '../shared/services/groupes.service';
import {ExcelService} from '../shared/services/excel.service';
import {Groupe} from '../shared/interfaces/groupe';
import {DialogComponent} from '../shared/dialogs/apprenant-dialog/dialog.component';
import {MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {filter, flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-apprenants',
  templateUrl: './apprenants.component.html',
  styleUrls: ['./apprenants.component.css']
})
export class ApprenantsComponent implements OnInit {

  private _apprenants: Apprenant[];
  private _apprenantsTemp: Apprenant[];
  private _apprenant: Apprenant;
  private _sites: Site[];
  private  _groupes: Groupe[];
  private _groupesSite: Groupe[];
  private _groupeTemp: Groupe;
  private _selectedSiteId: number | string;
  private _selectedGroupeId: number | string;
  private data : any[];
  private goupeId :number;

  private _dialogStatus: string;
  private _apprenantsDialog: MatDialogRef<DialogComponent>;

  private readonly _delete$: EventEmitter<Apprenant>;

  private _displayedColumns = ['NomPrenom', 'DateNaissance', 'PaysOrigine', 'Delete'];
  private _dataSource: MatTableDataSource<Apprenant>;
  _valueForSearch = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, private _apprenantsService: ApprenantsService, private excelService:ExcelService ,private _sitesService: SitesService,
              private _groupesService: GroupesService, private _dialog: MatDialog, private snackBar: MatSnackBar) {
    this._apprenants = [];
    this._apprenantsTemp = [];
    this._sites = [];
    this._groupes = [];
    this._groupesSite = [];
this.data=[];

    this._dialogStatus = 'inactive';
    this._selectedSiteId = 'allSites';
    this._selectedGroupeId = 'allGroupes';
  }


  ngOnInit() {
    this._apprenantsService.fetch().subscribe((apprenants) => {
      this._dataSource = new MatTableDataSource<Apprenant>(apprenants);
      this._apprenants = apprenants;
      this._apprenantsTemp = apprenants;
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
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  get apprenants(): Apprenant[] {
    return this._apprenants;
  }

  get sites(): Site[] {
    return this._sites;
  }

  afficherApprenants() {
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
    // On affiche tous les apprenants
    if ((this._selectedSiteId === 'allSites') && (this._selectedGroupeId === 'allGroupes')) {
      this._apprenants = this._apprenantsTemp;
    } else {
      // On affiche tous les apprenants spécifiques à un site
      if (this._selectedGroupeId === 'allGroupes') {
        this._apprenants = this._apprenantsTemp;
        this._apprenants = this._apprenants.filter(e => {
          this._groupes.forEach(g => {
            if (g.id === e.idGroupe) {
              this._groupeTemp = g;
            }
          });
          return this._groupeTemp.idSite === this._selectedSiteId;
        });
      } else {
        // On affiche tous les apprenants spécifiques à un groupe
        this._apprenants = this._apprenantsTemp;
        this._apprenants = this._apprenants.filter(e => {
          return e.idGroupe === this._selectedGroupeId;
        });
      }
    }
    this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
    this._dataSource.paginator = this.paginator;
    this._dataSource.paginator.firstPage();
    this._dataSource.filterPredicate = (data: {nom: string}, filterValue: string) =>
        data.nom.trim().toLowerCase().indexOf(filterValue) !== -1;
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  get groupesSites(): Groupe[] {
    return this._groupesSite;
  }

  set groupesSites(groupe: Groupe[]) {
    this._groupesSite = groupe;
    this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
    this._dataSource.paginator = this.paginator;
    this._dataSource.filterPredicate = (data: {nom: string}, filterValue: string) =>
        data.nom.trim().toLowerCase().indexOf(filterValue) !== -1;
  }

  @Input()
  set apprenant(apprenant: Apprenant) {
    this._apprenant = apprenant;
  }

  @Output('deleteApprenant')
  get delete$(): EventEmitter<Apprenant> {
    return this._delete$;
  }

  delete(id: number) {
    this._apprenantsService.delete(id).subscribe(null, null, () => this.ngOnInit());
  }


  /**
   * Function to display modal
   */
  showDialog() {
    // set apprenant-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._apprenantsDialog = this._dialog.open(DialogComponent, {
      width: '1000px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._apprenantsDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (apprenants: Apprenant[]) => {
              this._apprenants = apprenants;
              this._dataSource = new MatTableDataSource<Apprenant>(this._apprenants);
              this._dataSource.paginator = this.paginator;
              this._dataSource.filterPredicate = (data: {nom: string}, filterValue: string) =>
                  data.nom.trim().toLowerCase().indexOf(filterValue) !== -1;
            },
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  private _add(apprenant: Apprenant): Observable<Apprenant[]> {
    this.addOpenSnackBar();
    return this._apprenantsService
        .create(apprenant)
        .pipe(
            flatMap(_ => this._apprenantsService.fetch())
        );
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

  get dataSource(): MatTableDataSource<Apprenant> {
    return this._dataSource;
  }

  get selectedSiteId(): number | string {
    return this._selectedSiteId;
  }

  set selectedSiteId(value: number | string) {
    this._selectedSiteId = value;
  }

  get selectedGroupeId(): number | string {
    return this._selectedGroupeId;
  }

  set selectedGroupeId(value: number | string) {
    this._selectedGroupeId = value;
  }
  deleteConfirmation(id: number) {
    if (confirm('Voulez vous vraiment supprimer cet apprenant ?')) {
      this.delete(id);
      this.deleteOpenSnackBar();
    }
  }

  get valueForSearch(): string {
    return this._valueForSearch;
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
        case 'PaysOrigine': return compare(a.paysOrigine, b.paysOrigine, isAsc);
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


downloadApprenantsExcel(){
this.data=[];
var rsa;
var majeur;
var primoArrivant;
var milieuScolaire;
var lireLangue;
var ecrireLangue;
var lireAlphaLatin;
var ecrireAlphaLatin;
var cotisationPayee;

  	
		this._apprenants.forEach(apprenant => {
	this._groupes.forEach(e => {
	if(apprenant.idGroupe == e.id ){

//Affichage de boolean 
		if(apprenant.rsa==false){
		rsa='Non';
		}
		else if(apprenant.rsa==true){
		rsa='Oui';
		}
		else{
		rsa='';
		}

if(apprenant.majeur==false){
		majeur='Non';
		}
		else if(apprenant.majeur==true){
		majeur='Oui';
		}
		else{
		majeur='';
		}


if(apprenant.primoArrivant==false){
		primoArrivant='Non';
		}
		else if(apprenant.primoArrivant==true){
		primoArrivant='Oui';
		}
		else{
		primoArrivant='';
		}


if(apprenant.milieuScolaire==false){
		milieuScolaire='Non';
		}
		else if(apprenant.milieuScolaire==true){
		milieuScolaire='Oui';
		}
		else{
		milieuScolaire='';
		}

if(apprenant.lireLangue==false){
		lireLangue='Non';
		}
		else if(apprenant.lireLangue==true){
		lireLangue='Oui';
		}
		else{
		lireLangue='';
		}

if(apprenant.ecrireAlphaLatin==false){
		ecrireAlphaLatin='Non';
		}
		else if(apprenant.ecrireAlphaLatin==true){
		ecrireAlphaLatin='Oui';
		}
		else{
		ecrireAlphaLatin='';
		}

if(apprenant.cotisationPayee==false){
		cotisationPayee='Non';
		}
		else if(apprenant.majeur==true){
		cotisationPayee='Oui';
		}
		else{
		cotisationPayee='';
		}

if(apprenant.ecrireLangue==false){
		ecrireLangue='Non';
		}
		else if(apprenant.ecrireLangue==true){
		ecrireLangue='Oui';
		}
		else{
		ecrireLangue='';
		}

if(apprenant.lireAlphaLatin==false){
		lireAlphaLatin='Non';
		}
		else if(apprenant.lireAlphaLatin==true){
		lireAlphaLatin='Oui';
		}
		else{
		lireAlphaLatin='';
		}





if(apprenant.genre=="M"){
		this.data = this.data.concat({
		Nom : apprenant.nom,
		Prenom :apprenant.prenom,
		Naissance : apprenant.dateNaissance,
		Genre: apprenant.genre,
		Nationalité : apprenant.nationalite,
		PaysOrigine : apprenant.paysOrigine,
		Inscription :apprenant.dateInscription,
		Groupe : e.nom,
		DateArrivee : apprenant.dateArrivee,
		Telephone : apprenant.telephone,
		Adresse :apprenant.adresse,
		CodePostal : apprenant.codePostal,
		Commune : apprenant.commune,
		AuteurDossier:apprenant.auteurDossier,
		PrimoArrivant:primoArrivant,
		Majeur : majeur,
		QuartierPrioritaire: apprenant.quartierPrioritaire,
		SituationPersonnelle:apprenant.situationPersonnelle,
		PriseCharge : apprenant.priseCharge,
		RSA : rsa,
		tempsScolarisation: apprenant.tempsScolarisation,
  		diplome: apprenant.diplome,
		  milieuScolaire: milieuScolaire,
		  niveauLangue: apprenant.niveauLangue,
		  lireLangue: lireLangue,
		  ecrireLangue: ecrireLangue,
		  lireAlphaLatin: lireAlphaLatin,
		  ecrireAlphaLatin: ecrireAlphaLatin,
		  cotisationPayee: cotisationPayee,
		  remarques: apprenant.remarques,
		  statutSejour: apprenant.statutSejour,
		  dateCarteSejour: apprenant.dateCarteSejour,
		  dateFinCarteSejour: apprenant.dateFinCarteSejour,
		  statutPro: apprenant.statutPro,
		  typeContrat: apprenant.typeContrat
		
  
  
  
  
		});
	       }

else{

this.data = this.data.concat({
		Nom : apprenant.nom,
		Prenom :apprenant.prenom,
		Naissance : apprenant.dateNaissance,
		Genre: 'F',
		Nationalité : apprenant.nationalite,
		PaysOrigine : apprenant.paysOrigine,
		Inscription :apprenant.dateInscription,
		Groupe : e.nom,
		DateArrivee : apprenant.dateArrivee,
		Telephone : apprenant.telephone,
		Adresse :apprenant.adresse,
		CodePostal : apprenant.codePostal,
		Commune : apprenant.commune,
		AuteurDossier:apprenant.auteurDossier,
		PrimoArrivant:primoArrivant,
		Majeur : majeur,
		QuartierPrioritaire: apprenant.quartierPrioritaire,
		SituationPersonnelle:apprenant.situationPersonnelle,
		PriseCharge : apprenant.priseCharge,
		RSA : rsa,
		tempsScolarisation: apprenant.tempsScolarisation,
  		diplome: apprenant.diplome,
		  milieuScolaire: milieuScolaire,
		  niveauLangue: apprenant.niveauLangue,
		  lireLangue: lireLangue,
		  ecrireLangue: ecrireLangue,
		  lireAlphaLatin: lireAlphaLatin,
		  ecrireAlphaLatin: ecrireAlphaLatin,
		  cotisationPayee:cotisationPayee,
		  remarques: apprenant.remarques,
		  statutSejour: apprenant.statutSejour,
		  dateCarteSejour: apprenant.dateCarteSejour,
		  dateFinCarteSejour: apprenant.dateFinCarteSejour,
		  statutPro: apprenant.statutPro,
		  typeContrat: apprenant.typeContrat
		
		});



}

}
	      });
	 });
		
	
	      // Save excel
	     this.excelService.exportAsExcelFile(this.data, 'ListeAppreants');
	
	    
	  }




onFileChange(event: any) {
    var rsa;
    var majeur;
    var primoArrivant;
    var milieuScolaire;
    var lireLangue;
    var ecrireLangue;
    var lireAlphaLatin;
    var ecrireAlphaLatin;
    var cotisationPayee;
   
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
      const datas = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}

Object.keys(datas).forEach(k =>{

this._groupesService.existGroup(datas[k]['Groupe']).subscribe((existRes:boolean)=>{
if(existRes==false){
this._groupesService.create({
			 id: null,
			idSite :null,
                        nom:datas[k]['Groupe']
 } as Groupe).subscribe();

}


this._apprenantsService.exist(datas[k]['Nom'],datas[k]['Prenom']).subscribe((existRes:boolean)=>{
if(existRes==false){

if(datas[k]['RSA']==='Non'){
		rsa=false;
		}
		else if(datas[k]['RSA']==='Oui'){
		rsa=true;
		}
		else{
		rsa='';
		}

if(datas[k]['Majeur']==='Non'){
		majeur=false;
		}
		else if(datas[k]['Majeur']==='Oui'){
		majeur=true;
		}
		else{
		majeur='';
		}


if(datas[k]['PrimoArrivant']==='Non'){
		primoArrivant=false;
		}
		else if(datas[k]['PrimoArrivant']==='Oui'){
		primoArrivant=true;
		}
		else{
		primoArrivant='';
		}


if(datas[k]['milieuScolaire']==='Non'){
		milieuScolaire=false;
		}
		else if(datas[k]['milieuScolaire']==='Oui'){
		milieuScolaire=true;
		}
		else{
		milieuScolaire='';
		}

if(datas[k]['lireLangue']=='Non'){
		lireLangue=false;
		}
		else if(datas[k]['lireLangue']==='Oui'){
		lireLangue=true;
		}
		else{
		lireLangue='';
		}

if(datas[k]['ecrireAlphaLatin']==='Non'){
		ecrireAlphaLatin=false;
		}
		else if(datas[k]['ecrireAlphaLatin']==='Oui'){
		ecrireAlphaLatin=true;
		}
		else{
		ecrireAlphaLatin='';
		}

if(datas[k]['cotisationPayee']==='Non'){
		cotisationPayee=false;
		}
		else if(datas[k]['cotisationPayee']==='Oui'){
		cotisationPayee=true;
		}
		else{
		cotisationPayee='';
		}

if(datas[k]['ecrireLangue']==='Non'){
		ecrireLangue=false;
		}
		else if(datas[k]['ecrireLangue']==='Oui'){
		ecrireLangue=true;
		}
		else{
		ecrireLangue='';
		}

if(datas[k]['lireAlphaLatin']==='Non'){
		lireAlphaLatin=false;
		}
		else if(datas[k]['lireAlphaLatin']==='Oui'){
		lireAlphaLatin=true;
		}
		else{
		lireAlphaLatin='';
		}


this._groupesService.groupeByNom(datas[k]['Groupe']).subscribe((resNom:number) => {
this.goupeId=resNom;
this._apprenantsService.create({
		id :null,
                nom : datas[k]['Nom'],
		prenom :datas[k]['Prenom'],
		dateNaissance : datas[k]['Naissance'],
		genre: datas[k]['Genre'],
		nationalite : datas[k]['Nationalité'],
		paysOrigine : datas[k]['PaysOrigine'],
		dateInscription :datas[k]['Inscription'],
		idGroupe : this.goupeId,
		dateArrivee : datas[k]['DateArrivee'],
		telephone : datas[k]['Telephone'],
		adresse :datas[k]['Adresse'],
		codePostal : datas[k]['CodePostal'],
		commune : datas[k]['Commune'],
		auteurDossier:datas[k]['AuteurDossier'],
		primoArrivant:primoArrivant,
		majeur : majeur,
		quartierPrioritaire: datas[k]['QuartierPrioritaire'],
		situationPersonnelle:datas[k]['SituationPersonnelle'],
		priseCharge : datas[k]['PriseCharge'],
		rsa : rsa,
		tempsScolarisation: datas[k]['tempsScolarisation'],
  		diplome: datas[k]['diplome'],
		  milieuScolaire: milieuScolaire,
		  niveauLangue: datas[k]['niveauLangue'],
		  lireLangue: lireLangue,
		  ecrireLangue: ecrireLangue,
		  lireAlphaLatin: lireAlphaLatin,
		  ecrireAlphaLatin: ecrireAlphaLatin,
		  cotisationPayee:cotisationPayee,
		  remarques: datas[k]['remarques'],
		  statutSejour: datas[k]['statutSejour'],
		  dateCarteSejour: datas[k]['dateCarteSejour'],
		  dateFinCarteSejour: datas[k]['dateFinCarteSejour'],
		  statutPro: datas[k]['statutPro'],
		  typeContrat: datas[k]['typeContrat']

    
 } as Apprenant).subscribe();
this._apprenantsService.fetch().subscribe((apprenants) => {
      this._dataSource = new MatTableDataSource<Apprenant>(apprenants);
      this._apprenants = apprenants;
      this._apprenantsTemp = apprenants;
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

}
});

});
}); 

}
console.log(this._dataSource);
 }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
