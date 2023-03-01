import { FC, memo, useEffect, useState } from 'react';
import { fetchPokemonsData } from '../API/fetchData';
import { useIncrement } from '../hooks/useIncrement';
import { PokemonResult } from '../types.ts/PokemonResult';
import { Loader } from './Loader';
import { PokemonAbout } from './PokemonAbout';
import { PokemonsInfo } from './PokemonsInfo';
import Alert from '@mui/material/Alert';

export const GridMainTemplate: FC = memo(
  () => {
    const [pokemons, setPokemons] = useState<PokemonResult[]>([]);
    const [nextPokemonSet, setNextPokemonSet] = useState<string | null>();
    const [isError, setError] = useState(false);
    const [count, increment] = useIncrement();

    const getPokemons = async () => {
      try {
        const {
          next,
          results,
        } = await fetchPokemonsData(
          'https://pokeapi.co/api/v2/pokemon/?limit=12'
        );

        setPokemons(results);
        setNextPokemonSet(next);
      } catch (err) {
        setError(true);
      }
    }

    useEffect(() => {
      getPokemons();
    }, [])

    return (
      <div className='grid-main-template'>
        <div className='grid-main-template__first-column'>
          {pokemons.length > 0 && !isError && (
            <PokemonsInfo pokemons={pokemons} />
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
          <PokemonAbout />
        </div>
      </div>
    );
  },
);
