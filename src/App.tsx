import { GridMainTemplate } from './components/gridMainTemplate';
import { Header } from './components/header';
import { PokemonProvider } from './context/pokemonContext';

function App() {
  return (
    <PokemonProvider>
      <div className='container'>
        <div className="container__full-screen">
          <Header />

          <GridMainTemplate />
        </div>
      </div>
    </PokemonProvider>
  );
}

export default App;
