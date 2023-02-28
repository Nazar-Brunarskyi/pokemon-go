import { GridMainTemplate } from './components/gridMainTemplate';
import { Header } from './components/header';

function App() {
  return (
    <div className='container'>
      <div className="container__full-screen">
        <Header />

        <GridMainTemplate />
      </div>
    </div>
  );
}

export default App;
