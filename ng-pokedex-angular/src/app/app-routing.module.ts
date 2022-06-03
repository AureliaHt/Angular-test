import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// routes lues du haut vers le bas
// déclarer les routes spécifiques en premier et les globales en dernier
const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' }, //patchMatch:full => équivaut à faire correspondre l'intégralité de l'url
  { path: '**', component: PageNotFoundComponent} // opérateur ** intercepte toutes les routes /!\ ordre de lecture des routes, bien mettre cet opérateur en dernier
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
