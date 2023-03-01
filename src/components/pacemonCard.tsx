import { FC, memo, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PokemonResult } from '../types.ts/PokemonResult';
import { PokemonData } from '../types.ts/PokemonTypes';
import { Loader } from './Loader';
import { NOT_FOUND_IMG } from '../links';
import Alert from '@mui/material/Alert';

interface Props {
  pokemon: PokemonResult
}

export const PacemonCard: FC<Props> = memo(
  ({ pokemon }) => {
    const [loadedPokemon, setLoadedPokemon] = useState<PokemonData | null>(null);
    const [isError, setError] = useState(false);

    const getPokemon = async (url: string) => {
      try {
        let data = await fetch(url);

        if (!data.ok) {
          throw new Error('Problem with loading');
        }

        const {
          name,
          id,
          stats,
          abilities,
          types,
          sprites,
          weight,
        } = await data.json();

        setLoadedPokemon({
          name,
          id,
          stats,
          abilities,
          types,
          sprites,
          weight,
        });
      } catch (e) {
        setError(true);
      }
    }

    useEffect(() => {
      getPokemon(pokemon.url);
    }, [])

    return (
      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea sx={{ height: '300px' }}>
          {loadedPokemon && !isError && (
            <>
              <CardMedia
                component="img"
                height="200"
                image={`${loadedPokemon.sprites.front_default || NOT_FOUND_IMG}`}
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
                  {loadedPokemon?.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over 6,000
                  species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </>
          )}

          {!loadedPokemon && !isError && <Loader />}

          {isError && (
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
          )}
        </CardActionArea>
      </Card>
    );
  },
);
