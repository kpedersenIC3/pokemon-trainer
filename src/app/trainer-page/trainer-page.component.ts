import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trainer } from '../models/trainer.model';
import { PokemonsService } from '../services/pokemons.service';
import { TrainersService } from '../services/trainers.service';
import { PokemonInfo } from '../models/pokemon.model';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css'],
})
export class TrainerPageComponent implements OnInit {
  constructor(
    private readonly trainersservice: TrainersService,
    private readonly pokemonsservice: PokemonsService,
    private readonly router: Router
  ) {}
  isCollapsed = false;
  //On page load redirect to
  // landing page if user is not in localStorage, otherwise get
  // the trainer from trainerService
  ngOnInit(): void {
    if (localStorage.getItem('currentTrainer') === null) {
      this.router.navigate(['landing']);
    } else {
      console.log(this.pokemonsservice.fetchPokemonInfoByName('pikachu'));
      this.trainer;
    }
  }
  //getter to get the current trainer from the trainers service
  get trainer(): Trainer | null {
    return this.trainersservice.trainer();
  }
  //getter for the trainer in localStorage
  get currenttrainer(): Trainer {
    return JSON.parse(localStorage.getItem('currentTrainer') || '{}');
  }
  //getter to get pokemon info from  pokemons service
  get pokemoninfo(): PokemonInfo[] | undefined {
    return this.pokemonsservice.getPokemonInfo();
  }

  //When logging out, the localStorage is cleared and the landing page is loaded.
  public handleLogOut(): void {
    localStorage.clear();
    this.router.navigate(['landing']);
  }

  //When deleting a pokemon from collection, update the localStorage and
  // update the API.
  public handleSetPokemonFree(name: string): void {
    //update local storage.
    let currentTrainer = JSON.parse(
      localStorage.getItem('currentTrainer') || '{}'
    );
    //remove particular pokemon.
    const index = currentTrainer.pokemon.indexOf(name);
    currentTrainer.pokemon.splice(index, 1);
    localStorage.setItem('currentTrainer', JSON.stringify(currentTrainer));

    //update API.
    this.trainersservice.updateTrainer(
      JSON.parse(localStorage.getItem('currentTrainer') || '{}')
    );
  }
  //navbar link to navigate to catalogue page.
  public gotoCatalogue(): void {
    this.router.navigate(['catalogue']);
  }
  //handler that help to see if a pokemon is in the users collection.
  public checkIfCaught(name: string): boolean | undefined {
    let trainer: Trainer | null = this.trainersservice.trainer();
    return trainer?.pokemon.includes(name);
  }
}
