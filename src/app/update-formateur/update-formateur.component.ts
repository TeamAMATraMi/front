import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormateurDialogComponent} from '../shared/dialogs/formateur-dialog/formateur-dialog.component';
import {filter, flatMap, map} from 'rxjs/operators';
import {Formateur} from '../shared/interfaces/formateur';
import {ActivatedRoute, Router} from '@angular/router';
import {FormateursService} from '../shared/services/formateurs.service';

@Component({
  selector: 'app-update-formateur',
  templateUrl: './update-formateur.component.html',
  styleUrls: ['./update-formateur.component.css']
})
export class UpdateFormateurComponent implements OnInit {

  private _formateursDialog: MatDialogRef<FormateurDialogComponent>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _formateursService: FormateursService,
              private _dialog: MatDialog) { }

  ngOnInit() {
    this._route.params
        .pipe(
            map((params: any) => params.id),
            flatMap((id: string) => this._formateursService.fetchOne(id))
        )
        .subscribe((formateur: Formateur) => {
          this._formateursDialog = this._dialog.open(FormateurDialogComponent, {
            width: '500px',
            disableClose: true,
            data: formateur
          });

          // subscribe to afterClosed observable to set apprenant-dialogs status and do process
          this._formateursDialog.afterClosed()
              .pipe(
                  filter(_ => !!_),
                  flatMap(_ => this._formateursService.update(_))
              )
              .subscribe(null, null, () => this._router.navigate([ '/formateurs' ]));
        });
  }

}
