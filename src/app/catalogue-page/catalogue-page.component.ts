import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PokemonInfo } from "../models/pokemon.model";
import { Trainer } from "../models/trainer.model";
import { PokemonsService } from "../services/pokemons.service";
import { TrainersService } from "../services/trainers.service";


@Component({
    selector:'app-catalogue-page',
    templateUrl: './catalogue-page.component.html',
    styleUrls: ['./catalogue-page.component.css']
})
export class CataloguePageComponent implements OnInit{
    constructor(private readonly pokemonService: PokemonsService,
                private readonly trainersService: TrainersService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        console.log("catalogue page loaded")
        if(localStorage.getItem("currentTrainer") === null){
            this.router.navigate(['landing'])
        }
        else{
            this.trainersService.fetchTrainer(JSON.parse(localStorage.getItem("currentTrainer") || '{}').username)
        }
    }
    
    public handleCatchPokemon(name: string) : void {
        // let currentTrainer = JSON.parse(localStorage.getItem("currentTrainer") || '{}')
        // currentTrainer.pokemon.push(name)
        // localStorage.setItem("currentTrainer",JSON.stringify(currentTrainer))

        //update API

        console.log(`You caught ${name}!!`)
    }

    public handleCaughtPokemon(name: string) : void {
        alert("Pokemon already caught!")  
    }
    get pokemoninfo() : PokemonInfo[] | undefined {
        return this.pokemonService.getPokemonInfo();
    }

    public clickToProfile(): void {
        this.router.navigate(['trainer'])
    }

    public checkIfCaught(name:string): boolean | undefined {
        let trainer: Trainer | null = this.trainersService.trainer()
        return trainer?.pokemon.includes(name)
    }
}