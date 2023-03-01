import { FC, memo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { LoaderColor } from '../types.ts/loaderColor';

interface Props {
  color?: LoaderColor;
}

export const Loader: FC<Props> = memo(
  ({ color }) => {
    return (
      <Box sx={{
        display: 'flex',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <CircularProgress color={color} />
      </Box>
    );
  }
);
