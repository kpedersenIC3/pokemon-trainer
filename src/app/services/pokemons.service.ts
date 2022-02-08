import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PokemonObject,
  PokemonInfo,
  PokemonStats,
  PokeAPI,
} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private _error = '';
  private _pokemonlist: PokemonInfo[] | undefined = [];
  private _pokemonstats: PokemonStats[] = [];

  constructor(private readonly http: HttpClient) {}

  //Get list of pokemons from API and save the result in local storage.
  public fetchPokemonsFromAPI(): void {
    console.log('fetching pokemons from api');
    this.http
      .get<PokemonObject>('https://pokeapi.co/api/v2/pokemon?limit=50')
      .subscribe(
        (pokemons: PokemonObject) => {
          sessionStorage.setItem(
            'PokemonCatalogue',
            JSON.stringify(pokemons.results)
          );
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public fetchPokemonInfoByName(name: string): PokemonStats[] {
    this.http
      .get<PokeAPI>(`https://pokeapi.co/api/v2/pokemon/` + name)
      .subscribe((pokemoninfo) => {
        this._pokemonstats = [...pokemoninfo.stats];
      });

    return this._pokemonstats;
  }

  //Create a list of pokemons with an imageurl and id besides the name
  public getPokemonInfo(): PokemonInfo[] | undefined {
    this._pokemonlist = [];

    for (let pokemon of JSON.parse(
      sessionStorage.getItem('PokemonCatalogue') || '{}'
    )) {
      let pokeid = pokemon.url.split('/')[6];
      let pokemoninfo: PokemonInfo | undefined = {
        name: '',
        id: 0,
        imageurl: '',
      };
      pokemoninfo.name = pokemon.name;
      pokemoninfo.id = pokeid;
      pokemoninfo.imageurl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeid}.png`;

      this._pokemonlist.push(pokemoninfo);
    }
    return this._pokemonlist;
  }
}
