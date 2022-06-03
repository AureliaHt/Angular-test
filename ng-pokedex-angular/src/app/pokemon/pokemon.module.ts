import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { PokemonTypeColorPipe } from './pokemon-type-color.pipe';
import { BorderCardDirective } from './border-card.directive';
import { RouterModule, Routes } from '@angular/router';

const pokemonRoutes: Routes =[
  { path: 'pokemons', component: ListPokemonComponent },
  { path: 'pokemon/:id', component: DetailPokemonComponent }
];

// Module pour centraliser tout ce qui concerne la gestion des pokémons afin de décharger le module racine
// Angular = application modulaire, création de modules très utile sur de gros projets afin d'avoir une architecture moins chargée visuellement
// On "branche" dans le module les différents composants, pipes, directives, etc.
@NgModule({
  declarations: [
    DetailPokemonComponent,
    ListPokemonComponent,
    PokemonTypeColorPipe,
    BorderCardDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(pokemonRoutes)
  ]
})
export class PokemonModule { }
