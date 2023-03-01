import { memo, FC, CSSProperties } from 'react';
import Button from '@mui/material/Button';

interface Props {
  text: string
  styles?: CSSProperties,
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const CastomButton: FC<Props> = memo(
  ({ text, styles, onClick }) => {
    return (
      <Button
        onClick={onClick}
        variant="contained"
        disableElevation
        sx={styles}
      >
        {text}
      </Button>
    );
  }
);
