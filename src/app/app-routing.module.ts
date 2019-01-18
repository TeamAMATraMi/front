import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ApprenantsComponent} from './apprenants/apprenants.component';
import {FormateursComponent} from './formateurs/formateurs.component';
import {SitesComponent} from './sites/sites.component';
import {StatistiquesComponent} from './statistiques/statistiques.component';
import {ApprenantComponent} from './apprenant/apprenant.component';
import {GroupesComponent} from './groupes/groupes.component';
import {FormComponent} from './shared/form/form.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'apprenants', component: ApprenantsComponent },
    { path: 'apprenant/:id', component: ApprenantComponent },
    { path: 'updateApprenant', component: FormComponent },
    { path: 'formateurs', component: FormateursComponent},
    { path: 'sites', component: SitesComponent },
    { path: 'groupes', component: GroupesComponent },
    { path: 'statistiques', component: StatistiquesComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }