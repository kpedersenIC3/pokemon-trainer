import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Trainer } from "../models/trainer.model";
import { PokemonsService } from "../services/pokemons.service";
import { TrainersService } from "../services/trainers.service";
import { PokemonInfo } from "../models/pokemon.model";

@Component({
    selector: 'app-trainer-page',
    templateUrl: './trainer-page.component.html',
    styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit{
    constructor(private readonly trainerService: TrainersService,
                private readonly pokemonService: PokemonsService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
    }
    
    get trainer(): Trainer | null {
        return this.trainerService.trainer();
    }

    get currenttrainer(): Trainer {
        return JSON.parse(localStorage.getItem("currentTrainer") || '{}');
    }

    get pokemoninfo() : PokemonInfo[] | undefined{
        return this.pokemonService.getPokemonInfo();
    }

    public handleLogOut(): void {
        localStorage.clear()
        console.log(localStorage)
        this.router.navigate(['landing'])

    }

    public gotoCatalogue(): void {
        this.router.navigate(['catalogue'])
    }

    public checkIfCaught(name:string): boolean | undefined {
        let trainer: Trainer | null = this.trainerService.trainer()
        return trainer?.pokemon.includes(name)
    }




}