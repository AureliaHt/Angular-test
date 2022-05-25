import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

// Composant qui doit contenir au minimum deux composants => 
// selector donnant un nom au composant
// template pour gérer la view du composant
@Component({ 
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

export class AppComponent implements OnInit {
  pokemonList : Pokemon[] = POKEMONS;
  pokemonSelected : Pokemon|undefined;

  ngOnInit(): void {
    console.table(this.pokemonList);
  }

  selectPokemon(pokemonId : string) { // import du model
    const pokemon: Pokemon|undefined = this.pokemonList.find(pokemon => pokemon.id == +pokemonId); // l'opérateur + converti en nombre
    
    if (pokemon){
      console.log(`Vous avez demandé le pokémon ${pokemon.name}`);
      this.pokemonSelected = pokemon;
    } else {
      console.log(`Vous avez demandé un pokémon qui n'est pas présent dans la base de données ou qui n'existe pas`);
      this.pokemonSelected = pokemon;
    }
    
    // méthode avec des backticks pour déclarer une variable dynamique (ES6). Equivalent à la concaténation en JS ('vous avez cliqué ' + pokemonName)
  }
}
