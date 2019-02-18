import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApprenantsService} from '../shared/services/apprenants.service';
import {LoginService} from '../shared/services/login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Formateur} from '../shared/interfaces/formateur';
import {Utilisateur} from '../shared/interfaces/utilisateur';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnChanges {

  private _utilisateur: any = {};
  private readonly _form: FormGroup;

  constructor(private _loginsService: LoginService, private _route: ActivatedRoute, private _router: Router) {
    this._utilisateur = {
          'username': 'a',
          'password': 'a'
        };
    this._form = this._buildForm();
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

  submit(formateur: Formateur) {
    this._loginsService
        .login(this._utilisateur)
        .subscribe( isValid => {
          if (isValid) {
            sessionStorage.setItem(
                'token',
                btoa(this._utilisateur.username + ':' + this._utilisateur.password)
            );
            this._router.navigate(['/']);
          } else {
            console.log('Authentification failed');
            // alert('failed');
          }
        });
  }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  ngOnChanges(record) {
      this._utilisateur = record.formateur.currentValue;
      this._form.patchValue(this._utilisateur);
    }

  private _buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(2)
      ]))
    });
  }

}
