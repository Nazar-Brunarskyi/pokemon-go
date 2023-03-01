import { getData } from "./GetData";
import { PokemonResponse } from "../types.ts/PokemonResponse";

export async function fetchPokemonsData(url: string) {
  try {
    const data = await getData<PokemonResponse>(url);

    return data;
  } catch (err) {
    throw new Error('can\'t load pokemons')
  }
}