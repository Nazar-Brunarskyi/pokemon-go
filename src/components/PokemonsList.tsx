import { FC, memo, useState } from 'react';
import Container from '@mui/material/Container';
import { PacemonCard } from './pacemonCard';
import { CastomButton } from './button';
import { PokemonResult } from '../types.ts/PokemonResult';
import { PokemonData } from '../types.ts/PokemonTypes';

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

    const handleLoading = async () => {
      setShowLoader(true);

      await onLoad();

      setShowLoader(false);
    };

    return (
      <Container maxWidth="lg">
        <div className='PokemonsInfo__grid'>
          {
            pokemons.map(pokemon => (
              <PacemonCard
                onSelect={onPokemonSelect}
                pokemon={pokemon}
                key={pokemon.name}
              />
            ))
          }
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px'
        }}>
          <CastomButton
            onClick={handleLoading}
            isLoading={showLoader}
            text='Load More'
            styles={{
              width: '80%',
              maxWidth: '600px'
            }}
          />
        </div>
      </Container>
    );
  },
);
