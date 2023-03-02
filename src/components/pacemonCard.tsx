import { FC, memo, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PokemonData } from '../types.ts/PokemonTypes';
import { NOT_FOUND_IMG } from '../links';
import Alert from '@mui/material/Alert';
import { CustomButton } from './button';
import { PokemonContext } from '../context/pokemonContext';

interface Props {
  pokemon: PokemonData | undefined
  visibleTypes: string[]
}

export const PacemonCard: FC<Props> = memo(
  ({
    pokemon,
    visibleTypes,
  }) => {
    const {
      toggleTypes,
      selectPokemon,
    } = useContext(PokemonContext);

    const handleTypeSelect = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      type: string,
    ) => {
      event.stopPropagation();
      toggleTypes(type);
    }

    return (
      <>
        {
          pokemon
            ? <Card
              onClick={() => selectPokemon(pokemon)}
              sx={{ maxWidth: 250 }}
            >
              <CardActionArea sx={{ height: '300px' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${pokemon.sprites.front_default || NOT_FOUND_IMG}`}
                  alt="green iguana"
                  sx={{
                    width: '100px',
                    height: '100px',
                    margin: '0 auto 20px',
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    {pokemon?.name}
                  </Typography>

                  <div className='type-selector type-selector--on-card'>
                    {
                      pokemon.preparedTypes?.map(({ color, type }) => (
                        <CustomButton
                          onClick={(event) => { handleTypeSelect(event, type) }}
                          key={type}
                          text={type}
                          styles={{
                            width: '75px',
                            height: '30px',
                            background: color,
                          }}
                        />
                      ))
                    }
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
            : <Card
              sx={{ maxWidth: 250 }}
            >
              <Alert
                severity="error"
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                something went Wrong
              </Alert>
            </Card>
        }
      </>
    );
  },
);
