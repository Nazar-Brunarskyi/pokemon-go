import { FC, memo, useCallback, useState, useContext } from 'react';
import Container from '@mui/material/Container';
import { PacemonCard } from './pacemonCard';
import { CustomButton } from './button';
import { TypeSelector } from './typeSelector';
import { PokemonContext } from '../context/pokemonContext';

export const PokemonsList: FC = memo(
  () => {
    const [shouldShowLoaderOnButton, setshouldShowLoaderOnButton] = useState(false);

    const {
      visibleTypes,
      pokemons,
      toggleTypes,
      setVisibleTypes,
      getNewSetOfPokemons,
    } = useContext(PokemonContext);

    const handleLoading = useCallback(
      async () => {
        setshouldShowLoaderOnButton(true);
        setVisibleTypes([]);

        await getNewSetOfPokemons();

        setshouldShowLoaderOnButton(false);
      },
      [getNewSetOfPokemons, setVisibleTypes]
    );

    return (
      <Container maxWidth="lg">
        <TypeSelector onTypeSelect={toggleTypes} selectedTypes={visibleTypes} />

        <div className='PokemonsList__grid'>
          {
            pokemons.map(pokemon => (
              <PacemonCard
                key={pokemon?.name}
                pokemon={pokemon}
                visibleTypes={visibleTypes}
              />
            ))
          }
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px'
        }}>
          <CustomButton
            onClick={handleLoading}
            isLoading={shouldShowLoaderOnButton}
            text={visibleTypes.length ? 'reset all filters and load more' : 'Load More'}
            styles={{
              width: '80%',
              maxWidth: '600px',
              marginBottom: '50px '
            }}
          />
        </div>
      </Container>
    );
  },
);
