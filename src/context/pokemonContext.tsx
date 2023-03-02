import { useState, createContext, useCallback, FC, useEffect } from 'react';
import { allPokemonTypes } from '../additionalData/allPokemonTypes';
import { fetchPokemonsData } from '../API/fetchData';
import { GET_POKEMONS_URL } from '../links';
import { PokemonData, PokemonType } from '../types.ts/PokemonTypes';
import { typesOfPokemons } from '../types.ts/typesOfPokemons';

interface Props {
  children: JSX.Element,
};

interface ContextType {
  isError: boolean;
  pokemons: (PokemonData | undefined)[];
  selectedPokemon: PokemonData | null;
  visibleTypes: string[];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<PokemonData | null>>;
  getTypes: (pokemonTypesToParse: PokemonType[]) => typesOfPokemons[] | void;
  getPokemon: (url: string) => Promise<PokemonData | undefined> | void;
  getPokemons: () => Promise<void> | void;
  getNewSetOfPokemons: () => Promise<boolean> | void;
  toggleTypes: (type: string) => void;
}

export const PokemonContext = createContext<ContextType>({
  isError: false,
  pokemons: [],
  selectedPokemon: null,
  visibleTypes: [],
  setSelectedPokemon: () => { },
  getTypes: () => { },
  getPokemon: () => { },
  getPokemons: () => { },
  getNewSetOfPokemons: () => { },
  toggleTypes: () => { },
});

export const PokemonProvider: FC<Props> = ({ children }) => {
  const [pokemons, setPokemons] = useState<(PokemonData | undefined)[]>([]);
  const [nextPokemonSetLink, setNextPokemonSetLink] = useState<string | null>();
  const [isError, setError] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
  const [visibleTypes, setVisibleTypes] = useState<string[]>([]);

  const getTypes = useCallback(
    (pokemonTypesToParse: PokemonType[]) => {

      return pokemonTypesToParse.reduce((acc: typesOfPokemons[], { type }) => {
        const typeName = type.name;
        const foundType = allPokemonTypes
          .find(typeObject => (
            typeObject.type.toLocaleLowerCase() === typeName
          ));

        return foundType
          ? [...acc, foundType]
          : acc;
      }, []);
    },
    []
  )

  const getPokemon = useCallback(
    async (url: string): Promise<PokemonData | undefined> => {
      try {
        let data = await fetch(url);

        if (!data.ok) {
          throw new Error('Problem with loading');
        }

        let {
          name,
          id,
          stats,
          abilities,
          types,
          sprites,
          weight,
        } = await data.json();

        types = getTypes(types);

        return {
          name,
          id,
          stats,
          abilities,
          types,
          sprites,
          weight,
        };
      } catch (e) {
        setError(true);
      }
    },
    [getTypes],
  )

  const getPokemons = useCallback(
    async () => {
      try {
        const {
          next,
          results,
        } = await fetchPokemonsData(
          GET_POKEMONS_URL
        );

        const pokemons = await Promise.all(
          results.map((pokemon) => getPokemon(pokemon.url))
        );

        console.log(pokemons);

        setPokemons(pokemons);
        setNextPokemonSetLink(next);
      } catch (err) {
        setError(true);
      }
    },
    [getPokemon]
  )

  const getNewSetOfPokemons = async () => {
    try {
      if (!nextPokemonSetLink) {
        throw new Error('can\'t load more')
      }
      const {
        next,
        results,
      } = await fetchPokemonsData(
        nextPokemonSetLink,
      );

      const newPokemons = await Promise.all(
        results.map((pokemon) => getPokemon(pokemon.url))
      );

      setPokemons(pokemons => [...pokemons, ...newPokemons]);
      setNextPokemonSetLink(next);
    } catch (err) {
      setError(true);
    } finally {
      return true;
    }
  }

  const toggleTypes = useCallback((type: string) => {
    setVisibleTypes(typesFromOldState => {
      if (typesFromOldState.includes(type)) {
        return typesFromOldState
          .filter(typeOfPokemon => typeOfPokemon !== type)
      }

      return [...typesFromOldState, type];
    })
  }, [])

  useEffect(() => {
    getPokemons();
  }, [getPokemons])

  return (
    <PokemonContext.Provider value={{
      isError,
      pokemons,
      selectedPokemon,
      visibleTypes,
      setSelectedPokemon,
      getTypes,
      getPokemon,
      getPokemons,
      getNewSetOfPokemons,
      toggleTypes,
    }}>
      {children}
    </PokemonContext.Provider>
  );
}