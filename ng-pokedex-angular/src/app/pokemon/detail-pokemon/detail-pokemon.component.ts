import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
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
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private pokemonService: PokemonService) { }

  ngOnInit() {
    // import de nos data pokémons
    // récupération de l'id du pokémon
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    // pointer vers le pokémon choisi par l'utilisateur
    if (pokemonId) {
      this.pokemon = this.pokemonService.getPokemonById(+pokemonId);
    }
  }
  goBackToPokemonList() {
      this.router.navigate(['/pokemons'], { relativeTo: this.route});
  }
  goToPokemonEdit(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id]);
  }
}
