import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export const Header = () => {
  const headerHeight = '65px'; // i have the same variable in css

  return (
    <AppBar position="static" sx={{ background: '#404258', height: headerHeight }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'center',}}>
          <Typography 
            variant='h6'
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',

            }}
          >
            POKEDEX
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
