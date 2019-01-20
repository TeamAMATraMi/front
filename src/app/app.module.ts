import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {DialogComponent} from './shared/dialog/dialog.component';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatMenuModule, MatSelectModule, MatExpansionModule
} from '@angular/material';
import {SitesComponent} from './sites/sites.component';
import {ApprenantsComponent} from './apprenants/apprenants.component';
import {FormateursComponent} from './formateurs/formateurs.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import {ApprenantCardComponent} from './shared/apprenant-card/apprenant-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SitesCardComponent} from './shared/sites-card/sites-card.component';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {ApprenantDetailsComponent} from './shared/apprenant-details/apprenant-details.component';
import {GroupesComponent} from './groupes/groupes.component';
import {GroupeComponent} from './groupe/groupe.component';
import {FormateursCardComponent} from './shared/formateurs-card/formateurs-card.component';

import {ApprenantFormComponent} from './shared/forms/apprenant-form/apprenant-form.component';
import {UpdateComponent} from './update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DialogComponent,
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
    ApprenantFormComponent,
    UpdateComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
