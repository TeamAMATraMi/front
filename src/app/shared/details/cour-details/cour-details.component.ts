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
  private _presences: Presence[];
  private readonly _modifier$: EventEmitter<Cours>;
  private _dataSource: MatTableDataSource<Seance>;
  displayedColumns: string[] = ['date', 'horaire', 'modif'];



  constructor(private _presencesService: PresencesService, private _seancesService: SeancesService ,
              private _apprenantsService: ApprenantsService, private _route: ActivatedRoute, private _coursService: CoursService) {
    this._modifier$ = new EventEmitter<Cours>();
    this._cour = {} as Cours;
    this._presences = [];
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

    this._route.params.pipe(
        filter(params => !!params['id']),
        flatMap(params => this._presencesService.fetchByIdCours(params['id']))
    )
        .subscribe((presences: Presence[]) => this._presences = presences);

  }

  modifier() {
    this._modifier$.emit(this._cour);
  }

  private delete(id: number) {
    this._seancesService.delete(id).subscribe(null, null, () => this.ngOnInit());
  }

  downloadPDF() {
    const SESSION_CELL_MAX_CHARACTERS = 20;
    const SESSION_CELL_WIDTH = 28;
    if (!this._cour || !this._courApprenants || this._courApprenants.length < 1) {
      alert('Impossible de trouver le cours ou les participants... Veuillez réessayer.')
      return;
    }
    this._seancesService.fetchFromCours(this._cour.id).subscribe((seances: Seance[]) => {
          const doc = new jsPDF();
          const apprenantsRows = [];
          this._courApprenants.forEach(apprenant => {
            const cols = [];
            cols.push(apprenant.prenom + ' ' + apprenant.nom.toUpperCase());
            seances.forEach(cour =>{
              cols.push('');
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
          seances.forEach(seance => {
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
}
