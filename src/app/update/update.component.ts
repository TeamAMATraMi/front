import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { filter, flatMap, map } from 'rxjs/operators';
import { ApprenantsService } from '../shared/services/apprenants.service';
import { Apprenant } from '../shared/interfaces/apprenant';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: [ './update.component.css' ]
})
export class UpdateComponent implements OnInit {
  // private property to store dialog reference
  private _apprenantsDialog: MatDialogRef<DialogComponent>;

  /**
   * Component constructor
   */
constructor(private _route: ActivatedRoute, private _router: Router, private _apprenantsService: ApprenantsService,
              private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
        .pipe(
            map((params: any) => params.id),
            flatMap((id: string) => this._apprenantsService.fetchOne(id))
        )
        .subscribe((apprenant: Apprenant) => {
          this._apprenantsDialog = this._dialog.open(DialogComponent, {
            width: '500px',
            disableClose: true,
            data: apprenant
          });

          // subscribe to afterClosed observable to set dialog status and do process
          this._apprenantsDialog.afterClosed()
              .pipe(
                  filter(_ => !!_),
                  flatMap(_ => this._apprenantsService.update(_))
              )
              .subscribe(null, null, () => this._router.navigate([ '/apprenants' ]));
        });
  }
}