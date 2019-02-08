import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CoursService} from '../shared/services/cours.service';
import {Cours} from '../shared/interfaces/cours';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/operators';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  private _cours: Cours[];
  private _searchText: string;

  constructor(private _router: Router, private _coursService: CoursService) {
    this._cours = [];
  }

  ngOnInit() {
    this._coursService.fetch().subscribe((cours: Cours[]) =>
      this._cours = cours);
  }

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
  }

  get cours(): Cours[] {
    return this._cours;
  }

  set cours(value: Cours[]) {
    this._cours = value;
  }

  private _add(cour: Cours): Observable<Cours[]> {
    return this._coursService
      .create(cour)
      .pipe(
        flatMap(_ => this._coursService.fetch())
      );
  }

  delete(cour: Cours) {
    this._coursService
      .delete(cour.id)
      .subscribe(_ => {
        return this._cours = this._cours.filter(__ => __.id !== _);
      });
  }
}
