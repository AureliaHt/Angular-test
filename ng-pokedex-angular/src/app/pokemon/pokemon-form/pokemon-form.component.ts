import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html'
})
export class PokemonFormComponent implements OnInit {
  @Input() pokemon: Pokemon;
  types: string[];

  constructor(
    private router: Router,
    private pokemonService: PokemonService) { }

  ngOnInit() {
    this.types = this.pokemonService.getPokemonTypeList();
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
    console.log('Les changements ont été enregistré');
    this.router.navigate(['/pokemon', this.pokemon.id]);
  }
}
