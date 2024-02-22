import './App.css';
import Header from './componetns/Header/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import MoivePage from './pages/MoviePage/MoivePage';
import GenrePage from './pages/GenrePage/GenrePage';

function App() {
  return (
    <div className="App">
      <Header />
     
      <Routes>
        <Route path='/' element={<HomePage /> }/>
        <Route path='/movie/:id' element={<MoivePage /> }/>
        <Route path='/genere/:id' element={<GenrePage /> } />
      </Routes>
    </div>
  );
}

export default App;
