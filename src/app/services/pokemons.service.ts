import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PokemonObject,
  PokemonInfo,
  PokemonStats,
  PokeAPI,
  PokemonStatsList,
} from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  private _error = '';
  private _pokemonlist: PokemonInfo[] | undefined = [];
  private _pokemonstatslist: PokemonStatsList[] = [];

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
          for (let pokemon of pokemons.results) {
            let stats = this.fetchPokemonInfoByName(pokemon.name);
            console.log('setting stats', stats);
            this._pokemonstatslist.push({ name: pokemon.name, stats: stats });
          }
        },
        (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      );
  }

  public fetchPokemonInfoByName(name: string): PokemonStats[] {
    let stats: PokemonStats[] = [];
    this.http
      .get<PokeAPI>(`https://pokeapi.co/api/v2/pokemon/` + name)
      .subscribe((pokemoninfo) => {
        for (let stat of pokemoninfo.stats) {
          stats.push(stat);
        }
      });
    return stats;
  }

  //Create a list of pokemons with an imageurl and id besides the name
  public getPokemonInfo(): PokemonInfo[] | undefined {
    this._pokemonlist = [];
    console.log('List of stats', this._pokemonstatslist);
    for (let pokemon of JSON.parse(
      sessionStorage.getItem('PokemonCatalogue') || '{}'
    )) {
      let pokeid = pokemon.url.split('/')[6];
      let pokemoninfo: PokemonInfo | undefined = {
        name: '',
        id: 0,
        imageurl: '',
        stats: [],
      };
      pokemoninfo.name = pokemon.name;
      pokemoninfo.id = pokeid;
      pokemoninfo.imageurl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeid}.png`;
      for (let statobject of this._pokemonstatslist) {
        if (statobject.name === pokemon.name) {
          pokemoninfo.stats = statobject.stats;
        }
      }
      this._pokemonlist.push(pokemoninfo);
    }
    return this._pokemonlist;
  }
}
