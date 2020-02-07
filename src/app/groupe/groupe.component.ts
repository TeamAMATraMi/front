import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {filter} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {Apprenant} from '../shared/interfaces/apprenant';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {MatPaginator, MatSort, MatTableDataSource, Sort} from '@angular/material';
import {CoursService} from '../shared/services/cours.service';
import {Cours} from '../shared/interfaces/cours';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');



@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.css']
})
export class GroupeComponent implements OnInit {

  private _groupe: Groupe;
  private _apprenants: Apprenant[];
  private _sites: Site[];
  private readonly _delete$: EventEmitter<Groupe>;
  private _dataSource: MatTableDataSource<Apprenant>;
  private _displayedColumns = ['NomPrenom', 'DateNaissance', 'PaysOrigine'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _apprenantsService: ApprenantsService, private _route: ActivatedRoute, private _sitesService: SitesService, private _coursService: CoursService) {
    this._groupe = {} as Groupe;
    this._apprenants = [];
    this._sites = [];
    this._delete$ = new EventEmitter<Groupe>();
  }

  get groupe(): Groupe {
    return this._groupe;
  }

  get apprenants(): Apprenant[] {
    return this._apprenants;
  }

  @Input()
  set groupe(value: Groupe) {
    this._groupe = value;
    this._sitesService.fetch().subscribe((sites: Site[]) => { this._sites = sites; });
  }

  get sites(): Site[] {
    return this._sites;
  }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._apprenantsService.fetchByGroup(params['id'])),
    )
        .subscribe((apprenants: Apprenant[]) => {
          this._apprenants = apprenants;
          this._dataSource = new MatTableDataSource<Apprenant>(apprenants);
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
  }

  @Output('deleteGroupe')
  get delete$(): EventEmitter<Groupe> {
    return this._delete$;
  }

  delete(groupe: Groupe) {
    this._delete$.emit(groupe);
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }

  get dataSource(): MatTableDataSource<Apprenant> {
    return this._dataSource;
  }

  /**
  downloadPDF() {
    const SESSION_CELL_MAX_CHARACTERS = 10;
    const SESSION_CELL_WIDTH = 20;
    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._coursService.fetchFromGroup(params['id'])),
    )
    .subscribe((cours: Cours[]) => {
      const doc = new jsPDF();
      const apprenantsRows = [];
      this._apprenants.forEach(apprenant => {
        const cols = [];
        cols.push(apprenant.prenom + ' ' + apprenant.nom.toUpperCase());
        cours.forEach(cour =>{
          cols.push('');
        });
        apprenantsRows.push(cols);

      });
      const header = ['Apprenant'];
      const ownColumnStyles = {
        0: {
          columnWidth: 'auto'
        }
      };
      var index = 1;
      cours.forEach(cour => {
        var columnName = cour.matiere + ' ' + cour.horaire;
        columnName = columnName.substring(0, SESSION_CELL_MAX_CHARACTERS) + '...';
        header.push(columnName);
        ownColumnStyles[index++] = {columnWidth: SESSION_CELL_WIDTH};
      });
      doc.autoTable({
        showHead: 'everyPage',
        theme: 'grid',
        headerStyles: {
          fillColor: [255, 255, 255],
          fontStyle: 'bold',
          textColor: [0, 0, 0]
        },
        columnStyles: ownColumnStyles,
        head: [
            [
                {content: ''},
                {
                  content: 'Cours',
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

   */

  sortData(sort: Sort) {
    const data = this._dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this._dataSource.data = data;
      return;
    }
    this._dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'NomPrenom':
          return compare(a.nom, b.nom, isAsc);
        case 'PaysOrigine':
          return compare(a.paysOrigine, b.paysOrigine, isAsc);
        default:
          return 0;
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this._dataSource.filter = filterValue;
    this._dataSource.paginator.firstPage();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
