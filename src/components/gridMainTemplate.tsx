import { FC, memo, useCallback, useEffect, useState } from 'react';
import { fetchPokemonsData } from '../API/fetchData';
import { PokemonResult } from '../types.ts/PokemonResult';
import { Loader } from './Loader';
import { PokemonAbout } from './PokemonAbout';
import { PokemonsList } from './PokemonsList';
import Alert from '@mui/material/Alert';
import { GET_POKEMONS_URL } from '../links';
import { PokemonData, PokemonType } from '../types.ts/PokemonTypes';
import cn from 'classnames';
import { typesOfPokemons } from '../types.ts/typesOfPokemons';
import { allPokemonTypes } from '../additionalData/allPokemonTypes';
import { PokemonProvider } from '../context/pokemonContext';

export const GridMainTemplate: FC = memo(
  () => {
    const [pokemons, setPokemons] = useState<PokemonResult[]>([]);
    const [nextPokemonSet, setNextPokemonSet] = useState<string | null>();
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
    const [isError, setError] = useState(false);

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
      async (url: string) => {
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

    const getPokemons = async () => {
      try {
        const {
          next,
          results,
        } = await fetchPokemonsData(
          GET_POKEMONS_URL
        );

        const pokemons = await Promise.all(results.map((pokemon) => getPokemon(pokemon.url)))

        setPokemons(results);
        setNextPokemonSet(next);
      } catch (err) {
        setError(true);
      }
    };

    const getNewSetOfPokemons = async () => {
      try {
        if (!nextPokemonSet) {
          throw new Error('can\'t load more')
        }
        const {
          next,
          results,
        } = await fetchPokemonsData(
          nextPokemonSet,
        );

        setPokemons(pokemons => [...pokemons, ...results]);
        setNextPokemonSet(next);
      } catch (err) {
        setError(true);
      } finally {
        return true;
      }
    }

    const selectPokemon = useCallback(
      (pokemon: PokemonData | null) => {
        setSelectedPokemon(pokemon);
      },
      []
    )

    const hidePokemon = useCallback(
      () => {
        setSelectedPokemon(null);
      },
      []
    )

    useEffect(() => {
      getPokemons();
    }, [])

    return (
      <PokemonProvider>
        <div className={
          cn({
            'grid-main-template': true,
            'grid-main-template--second-hidden': !selectedPokemon,
          })
        }>
          <div className='grid-main-template__first-column'>
            {pokemons.length > 0 && !isError && (
              <PokemonsList
                pokemons={pokemons}
                onLoad={getNewSetOfPokemons}
                onPokemonSelect={selectPokemon}
              />
            )}

            {pokemons.length === 0 && !isError && <Loader />}

            {isError && (
              <Alert
                severity="error"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                can't load pokemons, try later
              </Alert>
            )}
          </div>

          <div className='grid-main-template__second-column'>
            {selectedPokemon && <PokemonAbout pokemon={selectedPokemon} onHide={hidePokemon} />}
          </div>
        </div>
      </PokemonProvider>
    );
  },
);
