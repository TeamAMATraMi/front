import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApprenantsComponent} from './apprenants/apprenants.component';
import {FormateursComponent} from './formateurs/formateurs.component';
import {SitesComponent} from './sites/sites.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {GroupesComponent} from './groupes/groupes.component';
import {GroupeComponent} from './groupe/groupe.component';
import {UpdateApprenantComponent} from './update/update-apprenant/update-apprenant.component';
import {FormateurComponent} from './formateur/formateur.component';
import {UpdateFormateurComponent} from './update/update-formateur/update-formateur.component';
import {HomeComponent} from './home/home.component';
import {UpdateGroupeComponent} from './update/update-groupe/update-groupe.component';
import {CoursComponent} from './cours/cours.component';
import {CourComponent} from './cour/cour.component';
import {UpdateCoursComponent} from './update/update-cours/update-cours.component';
import {LoginComponent} from './login/login.component';
import {UpdatePresenceComponent} from './update/update-presence/update-presence.component';
import {AuthGuard} from './guard/auth.guard';
import {PresenceComponent} from './presence/presence.component';
import {PresencesComponent} from './presences/presences.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', canActivate: [AuthGuard], pathMatch: 'full'},
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'apprenants', component: ApprenantsComponent, canActivate: [AuthGuard] },
    { path: 'apprenant/:id', component: ApprenantComponent, canActivate: [AuthGuard] },
    { path: 'apprenantsG/:id', component: GroupeComponent, canActivate: [AuthGuard] },
    { path: 'updateApprenant/:id', component: UpdateApprenantComponent, canActivate: [AuthGuard] },
    { path: 'formateurs', component: FormateursComponent, canActivate: [AuthGuard]},
    { path: 'cours', component: CoursComponent, canActivate: [AuthGuard]},
    { path: 'cours/:id', component: CourComponent, canActivate: [AuthGuard]},
    { path: 'updateCours/:id', component: UpdateCoursComponent, canActivate: [AuthGuard]},
    { path: 'formateur/:id', component: FormateurComponent, canActivate: [AuthGuard] },
    { path: 'formateurG/:id', component: GroupeComponent, canActivate: [AuthGuard] },
    { path: 'updateFormateur/:id', component: UpdateFormateurComponent, canActivate: [AuthGuard] },
    { path: 'sites', component: SitesComponent, canActivate: [AuthGuard] },
    { path: 'groupes', component: GroupesComponent, canActivate: [AuthGuard] },
    { path: 'groupe', component: GroupeComponent, canActivate: [AuthGuard] },
    { path: 'updateGroupe/:id', component: UpdateGroupeComponent, canActivate: [AuthGuard] },
    { path: 'statistiques', component: StatistiquesComponent, canActivate: [AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'login/:error', component: LoginComponent},
    { path: 'updatePresence/:id/:date', component: UpdatePresenceComponent, canActivate: [AuthGuard] },
    { path: 'statistiques', component: StatistiquesComponent, canActivate: [AuthGuard]},
    { path: 'presences', component: PresencesComponent, canActivate: [AuthGuard]},
    { path: 'presence/:id', component: PresenceComponent, canActivate: [AuthGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
