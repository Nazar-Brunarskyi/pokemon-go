import { FC, memo } from 'react';
import Container from '@mui/material/Container';
import { PacemonCard } from './pacemonCard';
import { CastomButton } from './button';
import { PokemonResult } from '../types.ts/PokemonResult';

interface Props {
  pokemons: PokemonResult[],
}

export const PokemonsInfo: FC<Props> = memo(
  ({ pokemons }) => {
    return (
      <Container maxWidth="lg">
        <div className='PokemonsInfo__grid'>
          {
            pokemons.map(pokemon => (
              <PacemonCard pokemon={pokemon}
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
