import { FC, memo } from 'react';
import { PokemonAbout } from './PokemonAbout';
import { PokemonsInfo } from './PokemonsInfo';

export const GridMainTemplate: FC = memo(
  () => {
    return (
      <div className='grid-main-template'>
        <div className='grid-main-template__first-column'>
          <PokemonsInfo />
        </div>
        <div className='grid-main-template__second-column'>
          <PokemonAbout />
        </div>
      </div>
    );
  },
);
