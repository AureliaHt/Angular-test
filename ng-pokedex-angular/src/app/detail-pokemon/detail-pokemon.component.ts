import { Component, OnInit } from '@angular/core';
import { POKEMONS } from '../mock-pokemon-list';
import { Pokemon } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
// activatedRoute -> procure un accès à une donnée via un chemin lié à un composant déjà chargé dans un template
// ActivatedRoute Snapshot pour traverser l'arborescence des routes  et recueillir la donnée à l'instant T
// ParamMap -> carte donnant les paramètres d'une route

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemon: Pokemon |  undefined;

  // injection de service via les paramètres de son constructeur
  // pour piloter les routes par id => injection du service
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // import de nos data pokémons
    this.pokemonList = POKEMONS;
    // récupération de l'id du pokémon
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    // pointer vers le pokémon choisi par l'utilisateur
    if (pokemonId) {
      this.pokemon = this.pokemonList.find( pokemon => pokemon.id === +pokemonId );
    }
  }
}
