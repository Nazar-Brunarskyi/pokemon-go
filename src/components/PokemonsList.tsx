import { FC, memo, useCallback, useState, } from 'react';
import Container from '@mui/material/Container';
import { PacemonCard } from './pacemonCard';
import { CustomButton } from './button';
import { PokemonResult } from '../types.ts/PokemonResult';
import { PokemonData } from '../types.ts/PokemonTypes';
import { TypeSelector } from './typeSelector';
import { useIncrement } from '../hooks/useIncrement';

interface Props {
  pokemons: PokemonResult[],
  onLoad: () => void;
  onPokemonSelect: (pokemon: PokemonData | null) => void;
}

export const PokemonsList: FC<Props> = memo(
  ({
    pokemons,
    onLoad,
    onPokemonSelect,
  }) => {
    const [showLoader, setShowLoader] = useState(false);
    const [visibleTypes, setVisibleTypes] = useState<string[]>([]);
    const [shownPokemons, incrementShownPokemons] = useIncrement();

    const toggleTypes = useCallback((type: string) => {
      incrementShownPokemons();

      setVisibleTypes(typesFromOldState => {
        if (typesFromOldState.includes(type)) {
          return typesFromOldState
            .filter(typeOfPokemon => typeOfPokemon !== type)
        }

        return [...typesFromOldState, type];
      })
    }, [])

    const handleLoading = useCallback(
      async () => {
        setShowLoader(true);
        setVisibleTypes([]);

        await onLoad();

        setShowLoader(false);
      },
      [onLoad]
    );

    return (
      <Container maxWidth="lg">
        <TypeSelector onTypeSelect={toggleTypes} selectedTypes={visibleTypes} />

        <div className='PokemonsList__grid'>
          {
            pokemons.map(pokemon => (
              <PacemonCard
                key={pokemon.name}
                onTypeSelect={toggleTypes}
                onPokemonSelect={onPokemonSelect}
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
            isLoading={showLoader}
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
