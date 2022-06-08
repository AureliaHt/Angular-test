import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
})

export class ListPokemonComponent implements OnInit {
  pokemonList : Pokemon[];

  constructor(
    private router: Router, 
    private pokemonService: PokemonService
  ) { }

  // Méthode .subscribe pour suivre un Observable, en l'occurrence getPokemonList, abonnement qui permet de recevoir la liste de pokémons
  // le subscribe me permet d'attribuer le flux de données dans ma propriété
  ngOnInit() {
    this.pokemonService.getPokemonList()
        .subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  goToPokemonDetails(pokemon: Pokemon) {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
