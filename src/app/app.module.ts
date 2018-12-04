import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import {
    MatToolbarModule,
    MatMenuModule,
    MatIconModule, MatInputModule,
} from '@angular/material';
import { SitesComponent } from './sites/sites.component';
import { ApprenantsComponent } from './apprenants/apprenants.component';
import { FormateursComponent } from './formateurs/formateurs.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { ApprenantCardComponent } from './shared/apprenant-card/apprenant-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SiteCardComponent } from './shared/site-card/site-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SitesComponent,
    ApprenantsComponent,
    FormateursComponent,
    StatistiquesComponent,
    ApprenantCardComponent,
    SiteCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
