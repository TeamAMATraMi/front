import {Component, OnInit, ViewChild} from '@angular/core';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {Router} from '@angular/router';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef, MatPaginator, MatSnackBar, MatTableDataSource,MatSort, Sort} from '@angular/material';
import {Observable} from 'rxjs';
import {SiteDialogComponent} from '../shared/dialogs/site-dialog/site-dialog.component';
import {ExcelService} from '../shared/services/excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {

  private _sites: Site[];
  private file : any;
  private _dialogStatus: string;
  private _sitesDialog: MatDialogRef<SiteDialogComponent>;
  private _displayedColumns = [ 'ville', 'Delete'];
	  private data : any[];
private exist: boolean; 

  private _dataSource: MatTableDataSource<Site>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, private _sitesService: SitesService,private excelService:ExcelService , private _dialog: MatDialog,
              private snackBar: MatSnackBar) {
    this._sites = [];
    this._dialogStatus = 'inactive';
  }

  ngOnInit() {
    this._sitesService.fetch().subscribe((sites: Site[]) => {
      this._sites = sites;
      this._dataSource = new MatTableDataSource<Site>(this._sites);
      this._dataSource.paginator = this.paginator;
      this._dataSource.sort = this.sort;
      this._dataSource.filterPredicate = (data: {ville: string}, filterValue: string) =>
        data.ville.trim().toLowerCase().indexOf(filterValue) !== -1;
    });
  }

  get dataSource(): MatTableDataSource<Site> {
    return this._dataSource;
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }

  get sites(): Site[] {
    return this._sites;
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  showDialog() {
    this._dialogStatus = 'active';

    // open modal
    this._sitesDialog = this._dialog.open(SiteDialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set site-dialogs status and do process
    this._sitesDialog.afterClosed()
      .pipe(
        filter(_ => !!_),
        flatMap(_ => this._add(_))
      )
      .subscribe(
        (sites: Site[]) => {
          this._sites = sites;
          this._dataSource = new MatTableDataSource<Site>(this._sites);
          this._dataSource.paginator = this.paginator;
        },
        _ => this._dialogStatus = 'inactive',
        () => this._dialogStatus = 'inactive'
      );
  }

  private _add(site: Site): Observable<Site[]> {
    this.addOpenSnackBar();
    return this._sitesService
      .create(site)
      .pipe(
        flatMap(_ => this._sitesService.fetch())
      );
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
        case 'id': return compare(a.id, b.id, isAsc);
        case 'ville': return compare(a.ville, b.ville, isAsc);
        default: return 0;
      }
    });
  }


  delete(id: number) {
    this._sitesService
      .delete(id)
      .subscribe(null, null, () => this.ngOnInit());
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this._dataSource.filter = filterValue;
    this._dataSource.paginator.firstPage();
  }

  deleteConfirmation(id: number) {
    if (confirm('Voulez vous vraiment supprimer ce site ?')) {
      this.delete(id);
      this.deleteOpenSnackBar();
    }
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

//export excel
downloadSitesExcel(){
this.data=[];
this._sites.forEach(site => {
this.data = this.data.concat({Ville: site.ville});
});

this.excelService.exportAsExcelFile(this.data, 'ListeSites');

}




//import Excel Site
    onFileChange(event: any) {
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
	 console.log(data); // Data will be logged in array format containing objects
	
Object.keys(data).forEach(k =>{
	Object.keys(data[k]).forEach(v =>{

this._sitesService.exist(data[k][v]).subscribe((res:boolean)=>{
this.exist=res;
if(!this.exist){
this._sitesService.create({
			 id: null,
                        ville:data[k][v]
 } as Site).subscribe();

//refresh data
this._sitesService.fetch().subscribe((sites: Site[]) => {
      this._sites = sites;
      this._dataSource = new MatTableDataSource<Site>(this._sites);
      this._dataSource.paginator = this.paginator;
      this._dataSource.sort = this.sort;
      this._dataSource.filterPredicate = (data: {ville: string}, filterValue: string) =>
        data.ville.trim().toLowerCase().indexOf(filterValue) !== -1;
    });

}
console.log(this._dataSource);



});
});


});
     
    };
console.log(this._dataSource);
 }
   

   
    
	



}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
