export interface PokemonObject {
  count: number;
  next: string;
  previous: null;
  results: PokemonList[];
}

export interface PokemonList {
  name: string;
  url: string;
}

export interface PokemonInfo {
  name: string;
  id: number;
  imageurl: string;
}

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: stat;
}
export interface stat {
  name: string;
  url: string;
}

export interface PokeAPI {
  abilities: [];
  base_experience: number;
  forms: [];
  game_indices: [];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: [];
  name: string;
  order: number;
  past_types: [];
  species: {};
  sprites: {};
  stats: PokemonStats[];
  types: [];
  weight: number;
}
