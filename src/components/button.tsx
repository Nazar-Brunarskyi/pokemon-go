import { memo, FC, CSSProperties } from 'react';
import Button from '@mui/material/Button';
import { Loader } from './Loader';

interface Props {
  text: string
  styles?: CSSProperties,
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean
}

export const CastomButton: FC<Props> = memo(
  ({
    text,
    styles,
    onClick,
    isLoading,
  }) => {
    return (
      <Button
        onClick={onClick}
        variant="contained"
        disableElevation
        sx={{height: '50px', ...styles}}
        component='span'
      >
        {
          isLoading
            ? <Loader color='inherit'/>
            : text
        }
      </Button>
    );
  }
);
