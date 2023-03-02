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
  visiblePokemons: (PokemonData | undefined)[];
  isLoaded: boolean,
  setVisibleTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedPokemon: React.Dispatch<React.SetStateAction<PokemonData | null>>;
  getTypes: (pokemonTypesToParse: PokemonType[]) => typesOfPokemons[] | void;
  getPokemon: (url: string) => Promise<PokemonData | undefined> | void;
  getPokemons: () => Promise<void> | void;
  getNewSetOfPokemons: () => Promise<boolean> | void;
  toggleTypes: (type: string) => void;
  selectPokemon: (pokemon: PokemonData | null) => void;
  hidePokemon: () => void
}

export const PokemonContext = createContext<ContextType>({
  isError: false,
  pokemons: [],
  selectedPokemon: null,
  visibleTypes: [],
  visiblePokemons: [],
  isLoaded: false,
  setVisibleTypes: () => { },
  setSelectedPokemon: () => { },
  getTypes: () => { },
  getPokemon: () => { },
  getPokemons: () => { },
  getNewSetOfPokemons: () => { },
  toggleTypes: () => { },
  selectPokemon: () => { },
  hidePokemon: () => { },
});

export const PokemonProvider: FC<Props> = ({ children }) => {
  const [pokemons, setPokemons] = useState<(PokemonData | undefined)[]>([]);
  const [nextPokemonSetLink, setNextPokemonSetLink] = useState<string | null>(null);
  const [isError, setError] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
  const [visibleTypes, setVisibleTypes] = useState<string[]>([]);
  const [isLoaded, setIsloaded] = useState(false);


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
  );

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

        const preparedTypes = getTypes(types);

        return {
          name,
          id,
          stats,
          abilities,
          types,
          preparedTypes,
          sprites,
          weight,
        };
      } catch (e) {
        setError(true);
      }
    },
    [getTypes],
  );

  const getPokemons = useCallback(
    async () => {
      setIsloaded(false);

      try {
        const {
          next,
          results,
        } = await fetchPokemonsData(
          GET_POKEMONS_URL
        );

        const newPokemons = await Promise.all(
          results.map((pokemon) => getPokemon(pokemon.url))
        );

        setPokemons(newPokemons);
        setNextPokemonSetLink(next);
      } catch (err) {
        setError(true);
      } finally {
        setIsloaded(true);
      }
    },
    [getPokemon]
  );

  const getNewSetOfPokemons = useCallback(
    async () => {
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
    },
    [nextPokemonSetLink, getPokemon]
  );

  const toggleTypes = useCallback((type: string) => {
    setVisibleTypes(typesFromOldState => {
      if (typesFromOldState.includes(type)) {
        return typesFromOldState
          .filter(typeOfPokemon => typeOfPokemon !== type)
      }

      return [...typesFromOldState, type];
    })
  }, []);

  const selectPokemon = useCallback(
    (pokemon: PokemonData | null) => {
      setSelectedPokemon(pokemon);
    },
    []
  );

  const hidePokemon = useCallback(
    () => {
      setSelectedPokemon(null);
    },
    []
  );

  const filterByType = useCallback(
    () => (
      pokemons.filter(pokemon => {
        for (const { type } of pokemon?.preparedTypes || []) {
          if (visibleTypes.includes(type)) {
            return true;
          }
        }

        return false;
      })
    ),
    [pokemons, visibleTypes]
  );

  useEffect(() => {
    getPokemons();
  }, [getPokemons])

  const visiblePokemons = visibleTypes.length === 0
    ? pokemons
    : filterByType();;

  return (
    <PokemonContext.Provider value={{
      isError,
      pokemons,
      selectedPokemon,
      visibleTypes,
      visiblePokemons,
      isLoaded,
      setVisibleTypes,
      setSelectedPokemon,
      getTypes,
      getPokemon,
      getPokemons,
      getNewSetOfPokemons,
      toggleTypes,
      selectPokemon,
      hidePokemon
    }}>
      {children}
    </PokemonContext.Provider>
  );
}