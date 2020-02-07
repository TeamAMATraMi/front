import { Component, OnInit } from '@angular/core';
import {Cours} from '../shared/interfaces/cours';
import {ActivatedRoute} from '@angular/router';
import {CoursService} from '../shared/services/cours.service';
import {filter, flatMap} from 'rxjs/operators';
import {CoursDialogComponent} from '../shared/dialogs/cours-dialog/cours-dialog.component';
import {MatDialog, MatDialogRef, MatTableDataSource} from '@angular/material';
import {SeanceDialogComponent} from '../shared/dialogs/seance-dialog/seance-dialog.component';

@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrls: ['./cour.component.css']
})
export class CourComponent implements OnInit {

  private _cour: Cours;

  private _dialogStatus: string;

  private _seanceDialog: MatDialogRef<SeanceDialogComponent>;



  constructor(private _coursService: CoursService, private _route: ActivatedRoute, private _dialog: MatDialog) {
    this._cour = {} as Cours;
    this._dialogStatus = 'inactive';

  }

  get dialogStatus(): string {
    return this._dialogStatus;
  }

  ngOnInit() {
    this._route.params.pipe(
      filter(params => !!params['id']),
      flatMap(params => this._coursService.fetchOne(params['id']))
    )
      .subscribe((cour: any) => this._cour = cour);
  }

  get cour(): Cours {
    return this._cour;
  }

  modifier(cour: Cours) {
    this._coursService
      .update(cour)
      .subscribe( _ => this._cour = _);
  }

  showDialog() {
    // set cours-dialogs status
    this._dialogStatus = 'active';

    // open modal
    this._seanceDialog = this._dialog.open(SeanceDialogComponent, {
      width: '500px',
      disableClose: true
    });

    /**
    // subscribe to afterClosed observable to set apprenant-dialogs status and do process
    this._seanceDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (cours: Cours[]) => {
              this._cours = cours;
              this._dataSource = new MatTableDataSource<Cours>(this._cours);
              this._dataSource.paginator = this.paginator;
            },
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive'
        );
     */
  }

}
