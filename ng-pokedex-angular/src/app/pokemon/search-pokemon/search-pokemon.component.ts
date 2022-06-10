import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Pokemon } from '../pokemon';

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

  constructor(private router: Router) { }

  ngOnInit() {
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
