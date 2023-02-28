import { getData } from "./GetData";
import { PokemonResult } from "../types.ts/PokemonResult";

export async function fetchData(url: string) {
  const data = await getData<PokemonResult>(url);

  return data;
}