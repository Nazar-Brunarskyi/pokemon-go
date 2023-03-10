import { FC, memo, useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { CustomTable } from './CustomTable';
import { NOT_FOUND_IMG } from '../links';
import { PokemonData } from '../types.ts/PokemonTypes';
import { CustomButton } from './button';
import { PokemonContext } from '../context/pokemonContext';

interface Props {
  pokemon: PokemonData;
}

export const PokemonAbout: FC<Props> = memo(
  ({ pokemon }) => {
    const { hidePokemon } = useContext(PokemonContext);

    const getInfo = (pokemonToParse: PokemonData): [string, string | number][] => {
      const info: any = {};
      info.weight = pokemonToParse.weight;

      pokemonToParse.stats.forEach(stat => {
        info[stat.stat.name] = stat.base_stat
      })

      info.types = pokemonToParse.types
        .reduce((acc, type) => acc + type.type.name + ', ', '')
        .trim();

      info.types = info.types.slice(0, info.types.length - 1)

      return Object.entries(info);
    }

    return (
      <Card sx={{ width: 250 }} >
        <CardActionArea>
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
              {`${pokemon.name} #${pokemon.id}`}
            </Typography>

            <CustomTable tableRows={getInfo(pokemon)} />
          </CardContent>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <CustomButton
              text='Hide'
              styles={{ margin: '10px', width: '50%' }}
              onClick={hidePokemon}
            />
          </div>
        </CardActionArea>
      </Card>
    );
  },
);
