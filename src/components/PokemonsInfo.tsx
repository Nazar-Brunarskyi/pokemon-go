import { FC, memo } from 'react';
import Container from '@mui/material/Container';
import { PacemonCard } from './pacemonCard';
import { CastomButton } from './button';

export const PokemonsInfo: FC = memo(
  () => {
    return (
      <Container maxWidth="lg">
        <div className='PokemonsInfo__grid'>
          <PacemonCard />
          <PacemonCard />
          <PacemonCard />
          <PacemonCard />
          <PacemonCard />
          <PacemonCard />
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
