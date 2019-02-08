import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Groupe} from '../shared/interfaces/groupe';
import {GroupesService} from '../shared/services/groupes.service';
import {filter, flatMap} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Observable} from 'rxjs';
import {GroupeDialogComponent} from '../shared/groupe-dialog/groupe-dialog.component';
@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent implements OnInit {

  private _groupes: Groupe[];
  private _dialogStatus: string;
  private _groupesDialog: MatDialogRef<GroupeDialogComponent>;

  constructor(private _router: Router, private _groupesService: GroupesService, private _dialog: MatDialog) {
    this._groupes = [];
    this._dialogStatus = 'inactive';
  }

  get groupes(): Groupe[] {
    return this._groupes;
  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  set dialogStatus(value: string) {
    this._dialogStatus = value;
  }

  ngOnInit() {
    // TODO : fetch with associated service
    this._groupesService.fetch().subscribe((groupes: Groupe[]) => this._groupes = groupes);
  }

  navigate(groupe: Groupe) {
    this._router.navigate(['/apprenantsG', groupe.id]);
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set apprenant-dialog status
    this._dialogStatus = 'active';

    // open modal
    this._groupesDialog = this._dialog.open(GroupeDialogComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set apprenant-dialog status and do process
    this._groupesDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (groupes: Groupe[]) => this._groupes = groupes,
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
  }

  private _add(groupe: Groupe): Observable<Groupe[]> {
    return this._groupesService
        .create(groupe)
        .pipe(
            flatMap(_ => this._groupesService.fetch())
        );
  }

  delete(groupe: Groupe) {
    this._groupesService
        .delete(groupe.id)
        .subscribe(_ => {
          return this._groupes = this._groupes.filter(__ => __.id !== _);
        });
  }

}
