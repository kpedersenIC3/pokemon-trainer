import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainersService } from '../services/trainers.service';
import { PokemonsService } from '../services/pokemons.service';

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

  // When Mounting the landing page, get pokemons from API and save
  // in sessionStorage for future use.
  // Also check if user already exists in localStorage and redirect to
  // catalogue page if true.
  ngOnInit(): void {
    //get pokemons
    this.pokemonsservice.fetchPokemonsFromAPI();

    //if user in localStorage redirect to catalogue page.
    if (localStorage.getItem('currentTrainer') !== null) {
      this.router.navigate(['catalogue']);
    }
  }

  //Handle the login. Fetches user from input from trainer API.
  public onTrainerLogIn(createForm: NgForm): void {
    this.trainersservice.fetchTrainer(
      createForm.value.username,
      this.router.url
    );
  }
}
