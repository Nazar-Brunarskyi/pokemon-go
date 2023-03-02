import { typesOfPokemons } from "./typesOfPokemons";

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  }
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  }
}

export interface Sprites {
  [key: string]: string | null;
}

export interface PokemonData {
  name: string;
  id: number;
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  types: PokemonType[];
  preparedTypes?: typesOfPokemons[]
  weight: number;
  sprites: Sprites
}
