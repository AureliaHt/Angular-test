import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

// Composant qui doit contenir au minimum deux composants => 
// selector donnant un nom au composant
@Component({ 
  selector: 'app-root',
  template: `<h1>Welcome on your Pokedex !</h1>
             <p> Liste des pokémons : </p>`
})
export class AppComponent implements OnInit {
  pokemonList : Pokemon[] = POKEMONS;

  ngOnInit(): void {
    console.table(this.pokemonList);
    this.selectPokemon(this.pokemonList[10]);
  }

  selectPokemon(pokemon : Pokemon) { // import du model
    console.log(`Vous avez cliqué sur le pokémon ${pokemon.name}`);
    // méthode avec des backticks pour déclarer une variable dynamique (ES6). Equivalent à la concaténation en JS ('vous avez cliqué ' + pokemonName)
  }
}
