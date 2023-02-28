import { memo, FC, CSSProperties } from 'react';
import Button from '@mui/material/Button';

interface Props {
  text: string
  styles?: CSSProperties,
}

export const CastomButton: FC<Props> = memo(
  ({ text, styles }) => {
    return (
      <Button
        variant="contained"
        disableElevation
        sx={styles}
      >
        {text}
      </Button>
    );
  }
);
