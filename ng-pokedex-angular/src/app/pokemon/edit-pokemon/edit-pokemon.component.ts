import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: ` <h2 class="center"> Editer {{ pokemon?.name }}</h2>
              <p *ngIf="pokemon" class="center"> 
                <img [src]="pokemon.picture"/>
              </p>
              <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>`  // utilisation du selector présent dans chaque composant pour faire le lien
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    // import data et récupération de l'id
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
     if (pokemonId) {
        this.pokemonService.getPokemonById(+pokemonId)
            .subscribe(pokemon => this.pokemon = pokemon);
     } else {
       this.pokemon = undefined;
     }
    }
  }
