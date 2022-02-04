import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainersService } from '../services/trainers.service';
import { Trainer } from '../models/trainer.model';
import { PokemonsService } from '../services/pokemons.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly trainersservice: TrainersService,
    private readonly pokemonsservice: PokemonsService
  ) {}

  ngOnInit(): void {
    console.log('landing page loading');
    //get pokemons
    this.pokemonsservice.fetchPokemonsFromAPI();

    //if user in localStorage and api
    if (localStorage.getItem('currentTrainer') !== null) {
      console.log('trainer exists in localStorage');
      this.router.navigate(['catalogue']);
    }
  }

  public onTrainerLogIn(createForm: NgForm): void {
    console.log('logging in');
    this.trainersservice.fetchTrainer(createForm.value.username);
  }
}
