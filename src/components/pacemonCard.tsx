import { FC, memo, useCallback, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PokemonResult } from '../types.ts/PokemonResult';
import { PokemonData, PokemonType } from '../types.ts/PokemonTypes';
import { Loader } from './Loader';
import { NOT_FOUND_IMG } from '../links';
import Alert from '@mui/material/Alert';
import { CustomButton } from './button';
import { typesOfPokemons } from '../types.ts/typesOfPokemons';
import { allPokemonTypes as typeObjects } from '../additionalData/allPokemonTypes';

interface Props {
  pokemon: PokemonResult
  visibleTypes: string[]
  onPokemonSelect: (pokemon: PokemonData | null) => void;
  onTypeSelect: (type: string) => void;
}

export const PacemonCard: FC<Props> = memo(
  ({ pokemon,
    onPokemonSelect,
    visibleTypes,
    onTypeSelect,
  }) => {
    const [loadedPokemon, setLoadedPokemon] = useState<PokemonData | null>(null);
    const [isError, setError] = useState(false);
    const [pokemonTypes, setPokemonTypes] = useState<typesOfPokemons[]>([])

    const getTypes = useCallback(
      (pokemonTypesToParse: PokemonType[]) => {

        return pokemonTypesToParse.reduce((acc: typesOfPokemons[], { type }) => {
          const typeName = type.name;
          const foundType = typeObjects
            .find(typeObject => (
              typeObject.type.toLocaleLowerCase() === typeName
            ));

          return foundType
            ? [...acc, foundType]
            : acc;
        }, []);
      },
      []
    )

    const getPokemon = useCallback(
      async (url: string) => {
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

          setPokemonTypes(getTypes(types));

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
      },
      [getTypes],
    )

    const handleTypeSelect = (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      type: string,
    ) => {
      event.stopPropagation();
      onTypeSelect(type);
    }

    useEffect(() => {
      getPokemon(pokemon.url);
    }, [pokemon, getPokemon])

    return (
      <Card
        onClick={() => onPokemonSelect(loadedPokemon)}
        sx={{ maxWidth: 250 }}
      >
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

                <div className='type-selector type-selector--on-card'>
                  {
                    pokemonTypes.map(({ color, type }) => (
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
