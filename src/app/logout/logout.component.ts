import { Component, OnInit } from '@angular/core';
import {LoginService} from '../shared/services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private  _loginService: LoginService ) { }

  ngOnInit() {
    this._loginService.logout();
  }

}
