import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {filter, flatMap, map} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupeDialogComponent} from '../shared/dialogs/groupe-dialog/groupe-dialog.component';
import {GroupesService} from '../shared/services/groupes.service';
import {Groupe} from '../shared/interfaces/groupe';

@Component({
  selector: 'app-update-groupe',
  templateUrl: './update-groupe.component.html',
  styleUrls: ['./update-groupe.component.css']
})
export class UpdateGroupeComponent implements OnInit {

  private _groupesDialog: MatDialogRef<GroupeDialogComponent>;

  constructor(private _route: ActivatedRoute, private _router: Router, private _groupesService: GroupesService,
              private _dialog: MatDialog) { }

  ngOnInit() {
    this._route.params
        .pipe(
            map((params: any) => params.id),
            flatMap((id: string) => this._groupesService.fetchOne(id))
        )
        .subscribe((groupe: Groupe) => {
          this._groupesDialog = this._dialog.open(GroupeDialogComponent, {
            width: '500px',
            disableClose: true,
            data: groupe
          });

          // subscribe to afterClosed observable to set dialogs status and do process
          this._groupesDialog.afterClosed()
              .pipe(
                  filter(_ => !!_),
                  flatMap(_ => this._groupesService.update(_))
              )
              .subscribe(null, null, () => this._router.navigate([ '/groupes' ]));
        });
  }

}
