import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PokemonInfo } from "../models/pokemon.model";
import { PokemonsService } from "../services/pokemons.service";


@Component({
    selector:'app-catalogue-page',
    templateUrl: './catalogue-page.component.html',
    styleUrls: ['./catalogue-page.component.css']
})
export class CataloguePageComponent implements OnInit{
    constructor(private readonly pokemonService: PokemonsService,
                private readonly router: Router) {
    }

    ngOnInit(): void {
        if(localStorage.getItem("currentTrainer") === null){
            this.router.navigate(['landing'])
        }
        if(sessionStorage.getItem("PokemonCatalogue") === null) {
            this.pokemonService.fetchPokemonsFromAPI();
        }
    }
    public handleCatchPokemon(name: string) : void {
        let currentTrainer = JSON.parse(localStorage.getItem("currentTrainer") || '{}')
        currentTrainer.pokemon.push(name)
        localStorage.setItem("currentTrainer",JSON.stringify(currentTrainer))

        console.log(`You caught ${name}!!`)
    }

    get pokemoninfo() : PokemonInfo[] {
        return this.pokemonService.getPokemonInfo();
    }

    public clickToProfile(): void {
        this.router.navigate(['trainer'])
    }

    public checkIfCaught(name:string): boolean {
        return JSON.parse(localStorage.getItem("currentTrainer") || '{}').pokemon.includes(name)
    }
}