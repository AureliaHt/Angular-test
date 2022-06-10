import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];
  isAddForm: boolean; // if true -> ajout de pokémon, if false -> édition d'un pokémon

  constructor(
    private router: Router,
    private pokemonService: PokemonService) { }

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
    this.isAddForm = this.router.url.includes('add'); // Booleen pour faire la différence (grâce aux url) entre les deux formulaires (edition, ajout) et savoir lequel ajouter
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type); // method js .includes() pour savoir si un tableau contient une valeur afin qu'il return un boolean
  }

  selectType($event: Event, type: string) {
      const isChecked: boolean = ($event.target as HTMLInputElement).checked;

      if(isChecked) {
        this.pokemon.types.push(type); // method js .push() pour ajouter une ou plusieurs valeurs à un tableau
      } else {
        const index = this.pokemon.types.indexOf(type);
        this.pokemon.types.splice(index, 1);
      }
  }

  isTypesValid(type: string): boolean {
    if(this.pokemon.types.length == 1 && this.hasType(type)) {
        return false;
    } if (this.pokemon.types.length >2 && !this.hasType(type)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    // instruction à éxécuter pour savoir quel formulaire afficher (ajout ou édition)
    if (this.isAddForm) {
      this.pokemonService.addPokemon(this.pokemon)
        .subscribe((pokemon: Pokemon) => this.router.navigate(['/pokemon', pokemon.id])); // coté backend création d'un id unique pour le nouvel ajout
    } else {
      this.pokemonService.updatePokemon(this.pokemon)
        .subscribe(() => this.router.navigate(['/pokemon', this.pokemon.id]));
    }
  }
}
