import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule, MatInputModule, MatCardModule, MatButtonModule, MatListModule,
} from '@angular/material';
import { SitesComponent } from './sites/sites.component';
import { ApprenantsComponent } from './apprenants/apprenants.component';
import { FormateursComponent } from './formateurs/formateurs.component';
import { StatistiquesComponent } from './statistiques/statistiques.component';
import { ApprenantCardComponent } from './shared/apprenant-card/apprenant-card.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SitesCardComponent } from './shared/sites-card/sites-card.component';
import { ApprenantComponent } from './apprenant/apprenant.component';
import { ApprenantDetailsComponent } from './shared/apprenant-details/apprenant-details.component';
import { GroupesComponent } from './groupes/groupes.component';
import { GroupeComponent } from './groupe/groupe.component';
import { FormateursCardComponent } from './shared/formateurs-card/formateurs-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SitesComponent,
    ApprenantsComponent,
    FormateursComponent,
    StatistiquesComponent,
    ApprenantCardComponent,
    SitesCardComponent,
    ApprenantComponent,
    ApprenantDetailsComponent,
    GroupesComponent,
    GroupeComponent,
    FormateursCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
