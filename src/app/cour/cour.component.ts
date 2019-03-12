import { Component, OnInit } from '@angular/core';
import {Cours} from '../shared/interfaces/cours';
import {ActivatedRoute} from '@angular/router';
import {CoursService} from '../shared/services/cours.service';
import {filter, flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-cour',
  templateUrl: './cour.component.html',
  styleUrls: ['./cour.component.css']
})
export class CourComponent implements OnInit {

  private _cour: Cours;

  constructor(private _coursService: CoursService, private _route: ActivatedRoute) {
    this._cour = {} as Cours;
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

}
