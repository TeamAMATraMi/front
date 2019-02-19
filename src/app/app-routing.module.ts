import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApprenantsComponent} from './apprenants/apprenants.component';
import {FormateursComponent} from './formateurs/formateurs.component';
import {SitesComponent} from './sites/sites.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {GroupesComponent} from './groupes/groupes.component';
import {GroupeComponent} from './groupe/groupe.component';
import {UpdateApprenantComponent} from './update-apprenant/update-apprenant.component';
import {FormateurComponent} from './formateur/formateur.component';
import {UpdateFormateurComponent} from './update-formateur/update-formateur.component';
import {HomeComponent} from './home/home.component';
import {UpdateGroupeComponent} from './update-groupe/update-groupe.component';
import {CoursComponent} from './cours/cours.component';
import {CourComponent} from './cour/cour.component';
import {UpdateCoursComponent} from './update-cours/update-cours.component';
import {LoginComponent} from './login/login.component';
import {UpdatePresenceComponent} from './update-presence/update-presence.component';
import {PresenceComponent} from './presence/presence.component';
import {PresencesComponent} from './presences/presences.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'apprenants', component: ApprenantsComponent },
    { path: 'apprenant/:id', component: ApprenantComponent },
    { path: 'apprenantsG/:id', component: GroupeComponent },
    { path: 'updateApprenant/:id', component: UpdateApprenantComponent },
    { path: 'formateurs', component: FormateursComponent},
    { path: 'cours', component: CoursComponent},
    { path: 'cours/:id', component: CourComponent},
    { path: 'updateCours/:id', component: UpdateCoursComponent},
    { path: 'formateur/:id', component: FormateurComponent },
    { path: 'formateurG/:id', component: GroupeComponent },
    { path: 'updateFormateur/:id', component: UpdateFormateurComponent },
    { path: 'sites', component: SitesComponent },
    { path: 'groupes', component: GroupesComponent },
    { path: 'groupe', component: GroupeComponent },
    { path: 'updateGroupe/:id', component: UpdateGroupeComponent },
    { path: 'statistiques', component: StatistiquesComponent},
    { path: 'login', component: LoginComponent},
    { path: 'presences', component: PresencesComponent},
    { path: 'presence/:id', component: PresenceComponent},
    { path: 'updatePresence/:id', component: UpdatePresenceComponent },
    { path: 'statistiques', component: StatistiquesComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
