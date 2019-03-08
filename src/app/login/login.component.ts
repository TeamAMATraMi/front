import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {LoginService} from '../shared/services/login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Utilisateur} from '../shared/interfaces/utilisateur';
import {filter, flatMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {

  private _utilisateur: any = {};
  private readonly _form: FormGroup;
  private _error: boolean;

  constructor(private _loginsService: LoginService, private _route: ActivatedRoute) {
    this._form = this._buildForm();
    this._error = false;
  }

  get error(): boolean {
    return this._error;
  }

  get form(): FormGroup {
    return this._form;
  }

  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  @Input()
  set utilisateur(value: Utilisateur) {
    this._utilisateur = value;
  }

  submit(utilisateur: Utilisateur) {
    this._utilisateur = utilisateur;
    this._loginsService
        .login(this._utilisateur);
  }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['error'])
    )
        .subscribe((_) => this._error = true);
  }

  ngOnChanges(record) {
      this._utilisateur = record.utilisateur.currentValue;
    }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl('0'),
      username: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
  }

}
