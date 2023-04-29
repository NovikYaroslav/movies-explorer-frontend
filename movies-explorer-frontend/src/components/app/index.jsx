import Header from '../header';
import Main from '../main';
import Movies from '../movies';
import { Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <>
      <Header currentLocation={location.pathname} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
      </Routes>
    </>
  );
}

export default App;
