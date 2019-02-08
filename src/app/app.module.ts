import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {DialogComponent} from './shared/dialogs/apprenant-dialog/dialog.component';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatMenuModule, MatSelectModule, MatExpansionModule, MatRadioModule, MatFormFieldModule
} from '@angular/material';
import {SitesComponent} from './sites/sites.component';
import {ApprenantsComponent} from './apprenants/apprenants.component';
import {FormateursComponent} from './formateurs/formateurs.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import {ApprenantCardComponent} from './shared/cards/apprenant-card/apprenant-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {SitesCardComponent} from './shared/cards/sites-card/sites-card.component';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {ApprenantDetailsComponent} from './shared/details/apprenant-details/apprenant-details.component';
import {GroupesComponent} from './groupes/groupes.component';
import {GroupeComponent} from './groupe/groupe.component';
import {FormateursCardComponent} from './shared/cards/formateurs-card/formateurs-card.component';

import {ApprenantFormComponent} from './shared/forms/apprenant-form/apprenant-form.component';
import {UpdateComponent} from './update/update.component';
import {FormateurComponent } from './formateur/formateur.component';
import {FormateurDetailsComponent} from './shared/details/formateur-details/formateur-details.component';
import {FormateurDialogComponent} from './shared/dialogs/formateur-dialog/formateur-dialog.component';
import { FormateurFormComponent } from './shared/forms/formateur-form/formateur-form.component';
import { UpdateFormateurComponent } from './update-formateur/update-formateur.component';
import {GroupeDialogComponent} from './shared/dialogs/groupe-dialog/groupe-dialog.component';

import {GroupeFormComponent} from './shared/forms/groupe-form/groupe-form.component';
import {UpdateGroupeComponent } from './update-groupe/update-groupe.component';
import {SearchPipe} from './shared/pipes/search.pipe';
import {HomeComponent } from './home/home.component';
import {CoursComponent } from './cours/cours.component';
import {CoursCardComponent } from './shared/cards/cours-card/cours-card.component';
import {CourDetailsComponent } from './shared/details/cour-details/cour-details.component';
import {CourComponent } from './cour/cour.component';
import { SiteFormComponent } from './shared/forms/site-form/site-form.component';
import {SiteDialogComponent} from './shared/dialogs/site-dialog/site-dialog.component';
import { SiteComponent } from './site/site.component';

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
    GroupeDialogComponent,
    GroupeFormComponent,
    FormateursCardComponent,
    ApprenantFormComponent,
    UpdateComponent,
    FormateurComponent,
    FormateurDetailsComponent,
    FormateurDialogComponent,
    FormateurFormComponent,
    UpdateFormateurComponent,
    UpdateGroupeComponent,
    SearchPipe,
    HomeComponent,
    CoursComponent,
    CoursCardComponent,
    CourDetailsComponent,
    CourComponent,
    SiteDialogComponent,
    SiteFormComponent,
    SiteComponent
  ],
  entryComponents: [
    DialogComponent,
    FormateurDialogComponent,
    GroupeDialogComponent,
    SiteDialogComponent
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
    MatExpansionModule,
    MatRadioModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
