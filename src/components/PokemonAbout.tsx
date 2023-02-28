import { FC, memo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { CustomTable } from './CustomTable';

// interface Props {

// }

export const PokemonAbout: FC = memo(
  () => {
    return (
      <Card sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image="https://cdn.vox-cdn.com/thumbor/8JToQParkzu_gl5zKmHzGenN17o=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23673901/unnamed.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Lizard
            </Typography>

            <CustomTable />
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
);
