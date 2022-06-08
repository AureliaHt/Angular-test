import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Pokemon } from './pokemon';

// Décorateur servant à signaler que notre service peut avoir d'autres dépendances
// Permet d'utiliser notre service dans d'autres composants également
// @Injectable déjà inclu dans les @Pipe, @Directive, @Component ...
@Injectable()
export class PokemonService {

  // injection du HttpClient dans le service afin de simuler des requêtes à un serveur distant
  constructor (private http: HttpClient) {

  }

  // réception de data contenant un tableau de pokémons de manière asynchrone
  // On retourne un flux : Observable qui contient les données qui arriveront plus tard
  // Requête GET pour récupérer des données
  // Méthode pipe pour utiliser plusieurs opérateurs ensemble
  // Opérateur tap retourne un observable identique à la source. Ne modifie pas le flux.
  // Observable of = interface pour gérer des opérations asynchrones. En cas d'erreur, l'app renverra un tableau vide.
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((pokemonList) => console.table(pokemonList)),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    )
  }

  // requête GET pour récupérer un pokémon selon son id
  // en cas d'erreur retourne undefined
  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => console.table(pokemon)),
      catchError((error) => {
        console.log(error);
        return of(undefined);
      })
    )
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
