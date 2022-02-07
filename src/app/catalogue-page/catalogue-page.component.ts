import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonInfo } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonsService } from '../services/pokemons.service';
import { TrainersService } from '../services/trainers.service';

@Component({
  selector: 'app-catalogue-page',
  templateUrl: './catalogue-page.component.html',
  styleUrls: ['./catalogue-page.component.css'],
})
export class CataloguePageComponent implements OnInit {
  constructor(
    private readonly pokemonsservice: PokemonsService,
    private readonly trainersservice: TrainersService,
    private readonly router: Router
  ) {}
  //When loading catalogue page, make a check if a user is in local storage.
  // if not then redirect to landing page, otherwise fetch the user from the
  // trainer API.
  ngOnInit(): void {
    if (localStorage.getItem('currentTrainer') === null) {
      this.router.navigate(['landing']);
    } else {
      this.trainersservice.fetchTrainer(
        JSON.parse(localStorage.getItem('currentTrainer') || '{}').username,
        ''
      );
    }
  }
  //Handler for catch pokemon button. Updates the localStorage with caught pokemon,
  //then updates the trainer API.
  public handleCatchPokemon(name: string): void {
    //update localStorage.
    let currentTrainer = JSON.parse(
      localStorage.getItem('currentTrainer') || '{}'
    );
    currentTrainer.pokemon.push(name);
    localStorage.setItem('currentTrainer', JSON.stringify(currentTrainer));

    //update API with new localStorage.
    this.trainersservice.updateTrainer(
      JSON.parse(localStorage.getItem('currentTrainer') || '{}')
    );
  }
  //Alert user if user tries to catch already caught pokemon.
  public handleCaughtPokemon(name: string): void {
    alert('Pokemon already caught!');
  }
  //Getter to get imageurl, name, id of pokemons in sessionStorage.
  get pokemoninfo(): PokemonInfo[] | undefined {
    return this.pokemonsservice.getPokemonInfo();
  }

  //Navigator link in navbar.
  public clickToProfile(): void {
    this.router.navigate(['trainer']);
  }
  //Check if pokemon already caught to dynamically update catalogue buttons.
  public checkIfCaught(name: string): boolean | undefined {
    let trainer: Trainer | null = this.trainersservice.trainer();
    return trainer?.pokemon.includes(name);
  }
}
