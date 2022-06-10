import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html'
})
export class SearchPokemonComponent implements OnInit {
  // searchTerms, méthode pour représenter le flux des recherches de l'utilisateur
  // Subject = Observable qui permet d'émettre de nouvelles valeurs dans un flux via la méthode next.
  searchTerms = new Subject<string>(); 
  // flux de pokémons qui devra correspondre aux termes recherchés par l'utilisateur
  pokemons$: Observable<Pokemon[]>;

  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit() {
    // méthode pour déclarer que les termes de la recherche doivent correspondre au flux de pokémons
    // opérateur debounceTime pour attendre un temps donné avant de renvoyer des données
    // opérateur distinctUntilChanged pour vérifier s'il y a un changement dans les termes avant renvoyer des données
    // opérateur map pour créer un nouvel Observable, à partir de l'Observable d'origine, en transformant chacune des valeurs
    // opérateur switchMap va unsubscribe / subscribe à un flux à chaque changement de valeur
    this.pokemons$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.pokemonService.searchInPokemonList(term))
    );
  }

  // implémentation d'une méthode pour renvoyer les termes recherchés par l'utilisateur
  // méthode next pour pousser un flux de données
  search(term: string) {
    this.searchTerms.next(term);
  }

  // méthode pour que l'utilisateur soit redirigé sur la fiche du pokémon sélectionné
  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id]; // construction du lien de redirection
    this.router.navigate(link); // redirection de l'utilisateur
  }

}
