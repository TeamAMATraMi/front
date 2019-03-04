import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    /**
     * Component constructor
     */
    constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer) {
    }

    /**
     * OnInit implementation
     */
    ngOnInit() {
        this._matIconRegistry.addSvgIcon('icon-delete',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/icon-delete.svg'));
        this._matIconRegistry.addSvgIcon('icon-edit',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/icon-edit.svg'));
        this._matIconRegistry.addSvgIcon('not-check',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/pasOk.svg'));
        this._matIconRegistry.addSvgIcon('check',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/ok.svg'));
        this._matIconRegistry.addSvgIcon('address',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/address.svg'));
        this._matIconRegistry.addSvgIcon('birthday',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/birthday.svg'));
        this._matIconRegistry.addSvgIcon('gender-female',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/gender-female.svg'));
        this._matIconRegistry.addSvgIcon('gender-male',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/gender-male.svg'));
        this._matIconRegistry.addSvgIcon('phone',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/phone.svg'));
    }

}
