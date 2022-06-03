import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Module pour centraliser tout ce qui concerne la gestion des pokémons afin de décharger le module racine
// Angular = application modulaire, création de modules très utile sur de gros projets afin d'avoir une architecture moins chargée visuellement
// On "branche" dans le module les différents composants, pipes, directives, etc.
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class PokemonModule { }
