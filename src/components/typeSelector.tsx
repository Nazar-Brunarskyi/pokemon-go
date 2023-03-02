import { FC, memo } from 'react';
import { allPokemonTypes } from '../additionalData/allPokemonTypes';
import { CustomButton } from './button';

interface Props {
  onTypeSelect: (type: string) => void;
  selectedTypes: string[];
}

export const TypeSelector: FC<Props> = memo(
  ({ onTypeSelect, selectedTypes }) => {
    return (
      <div className='type-selector'>
        <h2 className="type-selector__title">
          types filter
        </h2>

        <div className='type-selector__grid'>
          {
            allPokemonTypes.map(({ type, color }) => (
              <CustomButton
                key={type}
                onClick={() => onTypeSelect(type)}
                text={type}
                styles={{
                  width: selectedTypes.includes(type)
                    ? '110px'
                    : '100px',
                  height: selectedTypes.includes(type)
                    ? '#40px'
                    : '30px',
                  background: selectedTypes.includes(type)
                    ? '#00000e'
                    : color
                }}
              />
            ))
          }
        </div>
      </div>
    );
  },
);
