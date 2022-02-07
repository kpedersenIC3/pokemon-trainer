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
    private readonly trainerService: TrainersService,
    private readonly pokemonService: PokemonsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('currentTrainer') === null) {
      this.router.navigate(['landing']);
    } else {
      this.trainer;
    }
  }

  get trainer(): Trainer | null {
    return this.trainerService.trainer();
  }

  get currenttrainer(): Trainer {
    return JSON.parse(localStorage.getItem('currentTrainer') || '{}');
  }

  get pokemoninfo(): PokemonInfo[] | undefined {
    console.log('getting pokemon info');
    return this.pokemonService.getPokemonInfo();
  }

  public handleLogOut(): void {
    localStorage.clear();
    console.log(localStorage);
    this.router.navigate(['landing']);
  }

  public handleSetPokemonFree(name: string): void {
    let currentTrainer = JSON.parse(
      localStorage.getItem('currentTrainer') || '{}'
    );
    console.log('popping:', name);
    const index = currentTrainer.pokemon.indexOf(name);
    currentTrainer.pokemon.splice(index, 1);
    localStorage.setItem('currentTrainer', JSON.stringify(currentTrainer));

    //update API
    this.trainerService.updateTrainer(
      JSON.parse(localStorage.getItem('currentTrainer') || '{}')
    );

    console.log(`You set ${name} free!!`);
  }

  public gotoCatalogue(): void {
    this.router.navigate(['catalogue']);
  }

  public checkIfCaught(name: string): boolean | undefined {
    let trainer: Trainer | null = this.trainerService.trainer();
    return trainer?.pokemon.includes(name);
  }
}
