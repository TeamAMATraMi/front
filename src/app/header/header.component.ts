import { Component, OnInit } from '@angular/core';
import {LoginService} from '../shared/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    private _logged: boolean;

    constructor(private _loginService: LoginService) {
        this._logged = false;
    }

    ngOnInit() {
        this._logged = this._loginService.is_logged();
    }

    public get logged(): boolean {
        return this._loginService.is_logged();
    }



}
