import { FC, memo, useEffect, useContext } from 'react';
import { Loader } from './Loader';
import { PokemonAbout } from './PokemonAbout';
import { PokemonsList } from './PokemonsList';
import Alert from '@mui/material/Alert';
import cn from 'classnames';
import { PokemonContext } from '../context/pokemonContext';

export const GridMainTemplate: FC = memo(
  () => {
    const {
      isError,
      pokemons,
      selectedPokemon,
    } = useContext(PokemonContext);

    useEffect(() => {
      console.log(pokemons);
    }, [pokemons])

    return (
      <div className={
        cn({
          'grid-main-template': true,
          'grid-main-template--second-hidden': !selectedPokemon,
        })
      }>
        <div className='grid-main-template__first-column'>
          {pokemons.length > 0 && !isError && (
            <PokemonsList />
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
          {selectedPokemon && <PokemonAbout pokemon={selectedPokemon} />}
        </div>
      </div>
    );
  },
);
