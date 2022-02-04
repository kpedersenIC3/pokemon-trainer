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