import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {DialogComponent} from './shared/dialogs/apprenant-dialog/dialog.component';
import { ChartsModule } from 'ng2-charts';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatMenuModule,
  MatSelectModule,
  MatExpansionModule,
  MatRadioModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule, MatSortModule, MatTabsModule, MatGridListModule, MatSnackBarModule
} from '@angular/material';
import {SitesComponent} from './sites/sites.component';
import {ApprenantsComponent} from './apprenants/apprenants.component';
import {FormateursComponent} from './formateurs/formateurs.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import {ApprenantCardComponent} from './shared/cards/apprenant-card/apprenant-card.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {SitesCardComponent} from './shared/cards/sites-card/sites-card.component';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {ApprenantDetailsComponent} from './shared/details/apprenant-details/apprenant-details.component';
import {GroupesComponent} from './groupes/groupes.component';
import {GroupeComponent} from './groupe/groupe.component';
import {FormateursCardComponent} from './shared/cards/formateurs-card/formateurs-card.component';

import {ApprenantFormComponent} from './shared/forms/apprenant-form/apprenant-form.component';
import {UpdateApprenantComponent} from './update/update-apprenant/update-apprenant.component';
import {FormateurComponent} from './formateur/formateur.component';
import {FormateurDetailsComponent} from './shared/details/formateur-details/formateur-details.component';
import {FormateurDialogComponent} from './shared/dialogs/formateur-dialog/formateur-dialog.component';
import {FormateurFormComponent} from './shared/forms/formateur-form/formateur-form.component';
import {UpdateFormateurComponent} from './update/update-formateur/update-formateur.component';
import {GroupeDialogComponent} from './shared/dialogs/groupe-dialog/groupe-dialog.component';

import {GroupeFormComponent} from './shared/forms/groupe-form/groupe-form.component';
import {UpdateGroupeComponent} from './update/update-groupe/update-groupe.component';
import {HomeComponent} from './home/home.component';
import {CoursComponent} from './cours/cours.component';
import {CoursCardComponent} from './shared/cards/cours-card/cours-card.component';
import {CourDetailsComponent} from './shared/details/cour-details/cour-details.component';
import {CourComponent} from './cour/cour.component';
import {SiteFormComponent} from './shared/forms/site-form/site-form.component';
import {SiteDialogComponent} from './shared/dialogs/site-dialog/site-dialog.component';
import {SiteComponent} from './site/site.component';
import {CoursFormComponent} from './shared/forms/cours-form/cours-form.component';
import {CoursDialogComponent} from './shared/dialogs/cours-dialog/cours-dialog.component';
import { UpdateCoursComponent } from './update/update-cours/update-cours.component';
import { LoginComponent } from './login/login.component';

import {PresencesComponent} from './presences/presences.component';
import {PresenceComponent} from './presence/presence.component';
import {PresenceFormComponent} from './shared/forms/presence-form/presence-form.component';
import {PresenceDialogComponent} from './shared/dialogs/presence-dialog/presence-dialog.component';
import {UpdatePresenceComponent} from './update/update-presence/update-presence.component';
import {JwtInterceptor} from './shared/interceptors/jwt.interceptor';
import {ErrorInterceptor} from './shared/interceptors/error.interceptor';
import { LogoutComponent } from './logout/logout.component';


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
        UpdateApprenantComponent,
        FormateurComponent,
        FormateurDetailsComponent,
        FormateurDialogComponent,
        FormateurFormComponent,
        UpdateFormateurComponent,
        UpdateGroupeComponent,
        HomeComponent,
        CoursComponent,
        CoursCardComponent,
        CourDetailsComponent,
        CourComponent,
        CoursFormComponent,
        CoursDialogComponent,
        SiteDialogComponent,
        SiteFormComponent,
        SiteComponent,
        UpdateCoursComponent,
        LoginComponent,
        PresenceComponent,
        PresencesComponent,
        PresenceFormComponent,
        PresenceDialogComponent,
        UpdatePresenceComponent,
        LogoutComponent
    ],
    entryComponents: [
        DialogComponent,
        FormateurDialogComponent,
        GroupeDialogComponent,
        CoursDialogComponent,
        SiteDialogComponent,
        PresenceDialogComponent
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
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatGridListModule,
        ChartsModule,
        MatSnackBarModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
