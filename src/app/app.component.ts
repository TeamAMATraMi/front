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
        this._matIconRegistry.addSvgIcon('not-check',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/pasOk.svg'));
        this._matIconRegistry.addSvgIcon('check',
            this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/ok.svg'));
    }

}
