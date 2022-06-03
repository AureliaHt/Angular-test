import { Injectable } from '@angular/core';
import { POKEMONS } from './mock-pokemon-list';
import { Pokemon } from './pokemon';

// Décorateur servant à signaler que notre service peut avoir d'autres dépendances
// Permet d'utiliser notre service dans d'autres composants également
// @Injectable déjà inclu dans les @Pipe, @Directive, @Component ...
@Injectable()
export class PokemonService {

  // service prodigant la liste de pokémons
  getPokemonList(): Pokemon[] {
    return POKEMONS;
  }

  // service pour sélectionner un pokémon par son id
  getPokemonById(pokemonId: number): Pokemon|undefined {
    return POKEMONS.find(pokemon => pokemon.id === pokemonId);
  }

  // service pour avoir une liste dess types de pokémons
  getPokemonTypeList(): string[] {
    return [
      'Eau',
      'Plante', 
      'Feu', 
      'Poison', 
      'Insecte', 
      'Normal', 
      'Vol', 
      'Psy', 
      'Electrik', 
      'Fée', 
      'Combat', 
      'Acier'
    ];
  }
}
