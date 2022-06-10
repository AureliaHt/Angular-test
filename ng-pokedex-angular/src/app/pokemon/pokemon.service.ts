import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
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
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  // requête GET pour récupérer les informations d'un pokémon selon son id
  // en cas d'erreur retourne undefined
  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  // Implémentation d'une méthode pour ajouter de nouveaux pokémons
  // Requête de type POST avec Header Content-Type pour préciser l'envoi de données dans le corps de notre requête
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  // Implémentation d'une méthode pour permettre aux données de persister vers le serveur
  // Requête de type PUT pour update, faire une demande de modification des données
  // Header Content-Type, pour préciser au HttpClient qu'on envoie des données dans notre requête
  updatePokemon(pokemon: Pokemon): Observable<null> { // Normalement, remplacer la valeur null par Pokemon | undefined 
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(   // .put(url, corps de la requête (informations du pokémon), header(pour préciser qu'il y a des données de transmises))
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null)) // Remplacer null par undefined normalement
    );
  }

  // implémentation d'une méthode pour supprimer des pokémons
  // méthode http delete pour supprimer la ressource indiquée
  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  // implémentation d'une méthode pour rechercher un pokémon par son nom
  // condition : recherche si deux lettres minimum sont indiquées. Retourne un tableau vide si moins de 2 lettres sont entrées
  // url => requête sur une propriété du pokémon (le nom) à laquelle on passe le terme de recherche défini par l'utilisateur
  searchInPokemonList(term: string): Observable<Pokemon[]> {
    if(term.length <= 1) {
      return of([]);
    }
    
    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  // méthode privée non accessible à l'extérieur du service
  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);
    return of(errorValue);
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
