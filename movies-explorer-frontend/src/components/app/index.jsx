import { useState } from 'react';
import Footer from '../footer';
import Header from '../header';
import Login from '../login';
import Main from '../main';
import Movies from '../movies';
import NotFound from '../not-found/not-found';
import { Route, Routes, useLocation } from 'react-router-dom';
import Register from '../register';
import Profile from '../profile';

function App() {
  const location = useLocation();
  const [navigationOpened, setNavigationOpened] = useState(false);

  function handleNavMenuVisability() {
    setNavigationOpened(!navigationOpened);
  }

  return (
    <>
      <Header
        currentLocation={location.pathname}
        onNavButtonClick={handleNavMenuVisability}
        onCloseButtonClick={handleNavMenuVisability}
        visability={navigationOpened}
      />
      {/* <Login /> */}
      {/* <Register /> */}

      <Routes>
        {/* <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/*' element={<NotFound />} /> */}
        <Route path='/profile' element={<Profile />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
