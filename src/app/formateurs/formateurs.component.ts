import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Formateur} from '../shared/interfaces/formateur';
import {Router} from '@angular/router';
import {FormateursService} from '../shared/services/formateurs.service';
import {Site} from '../shared/interfaces/site';
import {SitesService} from '../shared/services/sites.service';
import {filter, flatMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Groupe} from '../shared/interfaces/groupe';
import {GroupesService} from '../shared/services/groupes.service';
import {FormateurDialogComponent} from '../shared/dialogs/formateur-dialog/formateur-dialog.component';

@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.css']
})
export class FormateursComponent implements OnInit {

  private _dataSource: Formateur[];
  private _displayedColumns = ['NomPrenom', 'Tel', 'Address', 'Delete'];

  private _formateur: Formateur;
  private readonly _delete$: EventEmitter<Formateur>;

  private _formateurs: Formateur[];
  private _sites: Site[];
  private _site: Site;
  private _groupesSite: Groupe[];
  private _groupes: Groupe[];

  private _dialogStatus: string;
  private _formateursDialog: MatDialogRef<FormateurDialogComponent>;

  private _searchText: string;

  constructor(private _router: Router, private _formateursService: FormateursService, private _sitesService: SitesService,
              private _dialog: MatDialog, private _groupesService: GroupesService) {
    this._formateurs = [];
    this._sites = [];
    this._dialogStatus = 'inactive';
    this._groupesSite = [];
    this._groupes = [];
  }

  ngOnInit() {
    // TODO : fetch with associated service formateur
    this._formateursService.fetch().subscribe((formateur: Formateur[]) => this._formateurs = formateur);
    this._sitesService.fetch().subscribe((sites: Site[]) => this._sites = sites);
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => { this._groupes = groupes; this._groupesSite = this._groupes; });
    this._formateursService.fetch().subscribe((_) => this._dataSource = _);
  }

  navigate(formateur: Formateur) {
    this._router.navigate(['/formateur', formateur.id]);
  }

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
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
    console.log(value);
    this._site = value;
  }

  changeFormateur(id: number) {
    // console.log(id);
    this._formateursService.fetchBySite(id).subscribe((formateur: Formateur[]) => this._formateurs = formateur);
  }

    changeFormateurAll() {
      this._formateursService.fetch().subscribe((formateur: Formateur[]) => this._formateurs = formateur);

    }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  set dialogStatus(value: string) {
    this._dialogStatus = value;
  }

  showDialog() {
    // set apprenant-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._formateursDialog = this._dialog.open(FormateurDialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._formateursDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (formateurs: Formateur[]) => this._dataSource = formateurs,
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
    return this._formateursService
        .create(formateur)
        .pipe(
            flatMap(_ => this._formateursService.fetch())
        );
  }

  get formateur(): Formateur {
    return this._formateur;
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

  get dataSource(): Formateur[] {
    return this._dataSource;
  }

  get displayedColumns(): any {
    return this._displayedColumns;
  }
}
