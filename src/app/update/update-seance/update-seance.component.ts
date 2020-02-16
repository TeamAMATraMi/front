import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {CoursDialogComponent} from '../../shared/dialogs/cours-dialog/cours-dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {CoursService} from '../../shared/services/cours.service';
import {filter, flatMap, map} from 'rxjs/operators';
import {Cours} from '../../shared/interfaces/cours';
import {SeanceDialogComponent} from '../../shared/dialogs/seance-dialog/seance-dialog.component';
import {SeancesService} from '../../shared/services/seances.service';
import {Seance} from '../../shared/interfaces/seance';

@Component({
  selector: 'app-update-seance',
  templateUrl: './update-seance.component.html',
  styleUrls: ['./update-seance.component.css']
})
export class UpdateSeanceComponent implements OnInit {

  private _seanceDialog: MatDialogRef<SeanceDialogComponent>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _seancesService: SeancesService,
              private _dialog: MatDialog) { }

  ngOnInit() {
    this._route.params
        .pipe(
            map((params: any) => params.id),
            flatMap((id: number) => this._seancesService.fetchOne(id))
        )
        .subscribe((seance: Seance) => {
          this._seanceDialog = this._dialog.open(SeanceDialogComponent, {
            width: '500px',
            disableClose: true,
            data: seance
          });
          console.log(seance);

          // subscribe to afterClosed observable to set apprenant-dialogs status and do process
          this._seanceDialog.afterClosed()
              .pipe(
                  filter(_ => !!_),
                  flatMap(_ => this._seancesService.update(_))
              )
              .subscribe(null, null, () => this._router.navigate([ '/cours']));
        });
  }

}
