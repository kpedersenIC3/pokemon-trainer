import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PokemonObject, PokemonList, PokemonInfo } from "../models/pokemon.model";


@Injectable({
    providedIn: 'root'
})
export class PokemonsService {

    private _pokemons: PokemonObject = {count:0,next:'',previous:null, results:[]};
    private _error = '';
    private _pokemonlist: PokemonInfo[] | undefined = [] 

    constructor(private readonly http: HttpClient) {

    }

    public fetchPokemonsFromAPI(): void {
        console.log("fetching pokemons from api")
        this.http.get<PokemonObject>('https://pokeapi.co/api/v2/pokemon?limit=30')
            .subscribe( (pokemons: PokemonObject) => {
                sessionStorage.setItem("PokemonCatalogue",JSON.stringify(pokemons.results) );                
            }, (error: HttpErrorResponse) => {
                this._error = error.message;
            }) 
        
    }

    public getPokemonInfo(): PokemonInfo[] | undefined {

        this._pokemonlist = []

        

        for(let pokemon of JSON.parse(sessionStorage.getItem("PokemonCatalogue") || '{}') ) {
            let pokeid = pokemon.url.split('/')[6]
            let pokemoninfo: PokemonInfo | undefined = {name:'',id:0,imageurl:''};
            pokemoninfo.name = pokemon.name
            pokemoninfo.id = pokeid
            pokemoninfo.imageurl =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeid}.png` 
            this._pokemonlist.push(pokemoninfo)
        }
        return this._pokemonlist;
    }


}   
