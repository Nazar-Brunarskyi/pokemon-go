import { FC, memo, useCallback, useState, useContext } from 'react';
import Container from '@mui/material/Container';
import { PacemonCard } from './pacemonCard';
import { CustomButton } from './button';
import { TypeSelector } from './typeSelector';
import { PokemonContext } from '../context/pokemonContext';
import Alert from '@mui/material/Alert';

export const PokemonsList: FC = memo(
  () => {
    const [shouldShowLoaderOnButton, setshouldShowLoaderOnButton] = useState(false);

    const {
      visibleTypes,
      visiblePokemons,
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
            visiblePokemons.length > 0
              ? (
                visiblePokemons.map(pokemon => (
                  <PacemonCard
                    key={pokemon?.name}
                    pokemon={pokemon}
                    visibleTypes={visibleTypes}
                  />
                ))
              )
              : <Alert
                severity="warning"
                sx={{
                  gridColumn: '1 / span all',
                  fontSize: '16px'
                }}
              >
                there aren't any pokemon which fit your filter params
              </Alert>
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
