import { Component, OnInit } from '@angular/core';

// Composant qui doit contenir au minimum deux composants => 
// selector donnant un nom au composant
@Component({ 
  selector: 'app-root',
  template: `<h1>Welcome on your Pokedex !</h1>
             <p> Here's {{ pokemonList[1] }}</p>`
})
export class AppComponent implements OnInit {
  pokemonList = ['Rondoudou', 'Noctali', 'Mew'];

  ngOnInit(): void {
    console.table(this.pokemonList);
    this.selectPokemon('Raichu');
  }

  selectPokemon(pokemonName : string) {
    console.log(`Vous avez cliqué sur le pokémon ${pokemonName}`); 
    // méthode avec des backticks pour déclarer une variable dynamique (ES6). Equivalent à la concaténation en JS ('vous avez cliqué ' + pokemonName)
  }
}
