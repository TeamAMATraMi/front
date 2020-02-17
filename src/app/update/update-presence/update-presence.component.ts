import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {filter, flatMap, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {PresenceDialogComponent} from '../../shared/dialogs/presence-dialog/presence-dialog.component';
import {PresencesService} from '../../shared/services/presences.service';
import {Presence} from '../../shared/interfaces/presence';

@Component({
  selector: 'app-update-presence',
  templateUrl: './update-presence.component.html',
  styleUrls: ['./update-presence.component.css']
})
export class UpdatePresenceComponent implements OnInit {

  private _presenceDialog: MatDialogRef<PresenceDialogComponent>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _presencesService: PresencesService,
              private _dialog: MatDialog) { }

  ngOnInit() {
    this._route.params
        .pipe(
            filter(params => !!params['id']),
            flatMap(params => {
              return this._presencesService.fetchByIdSeance(params['id'])})
        )
        .subscribe((presences: Presence[]) => {
          this._presenceDialog = this._dialog.open(PresenceDialogComponent, {
            width: '500px',
            disableClose: true,
            data: presences
          });

          // subscribe to afterClosed observable to set dialogs status and do process
          this._presenceDialog.afterClosed()
              .pipe(
                  filter(_ => !!_),
                  flatMap(_ => this._presencesService.update(_))
              )
              .subscribe(null, null, () => this._router.navigate([ '/cours' ]));
        });
  }

}
