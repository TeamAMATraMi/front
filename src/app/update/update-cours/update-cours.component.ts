import { Component, OnInit } from '@angular/core';
import {CoursDialogComponent} from '../../shared/dialogs/cours-dialog/cours-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CoursService} from '../../shared/services/cours.service';
import {filter, flatMap, map} from 'rxjs/operators';
import {Cours} from '../../shared/interfaces/cours';

@Component({
  selector: 'app-update-cours',
  templateUrl: './update-cours.component.html',
  styleUrls: ['./update-cours.component.css']
})
export class UpdateCoursComponent implements OnInit {

  private _coursDialog: MatDialogRef<CoursDialogComponent>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _coursService: CoursService,
              private _dialog: MatDialog) { }

  ngOnInit() {
    this._route.params
        .pipe(
            map((params: any) => params.id),
            flatMap((id: number) => this._coursService.fetchOne(id))
        )
        .subscribe((cours: Cours) => {
          this._coursDialog = this._dialog.open(CoursDialogComponent, {
            width: '500px',
            disableClose: true,
            data: cours
          });

          // subscribe to afterClosed observable to set apprenant-dialogs status and do process
          this._coursDialog.afterClosed()
              .pipe(
                  filter(_ => !!_),
                  flatMap(_ => this._coursService.update(_))
              )
              .subscribe(null, null, () => this._router.navigate([ '/cours' ]));
        });
  }

}
