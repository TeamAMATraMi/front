import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApprenantsComponent} from './apprenants/apprenants.component';
import {FormateursComponent} from './formateurs/formateurs.component';
import {SitesComponent} from './sites/sites.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {GroupesComponent} from './groupes/groupes.component';
import {GroupeComponent} from './groupe/groupe.component';
import {ApprenantFormComponent} from './shared/forms/apprenant-form/apprenant-form.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'apprenants', component: ApprenantsComponent },
    { path: 'apprenant/:id', component: ApprenantComponent },
    { path: 'apprenantsG/:id', component: GroupeComponent },
    { path: 'updateApprenant/:id', component: ApprenantFormComponent },
    { path: 'formateurs', component: FormateursComponent},
   // { path: 'formateur', component: FormateurComponent},
    { path: 'sites', component: SitesComponent },
  //  { path: 'site', component: SiteComponent },
    { path: 'groupes', component: GroupesComponent },
    { path: 'groupe', component: GroupeComponent },
    { path: 'statistiques', component: StatistiquesComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
