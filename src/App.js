import './App.css';
import Navigation from './Components/Shared/Navigation';
import LandingPage from './Pages/LandingPage/LandingPage';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TopupPage from './Pages/TouupPage/TopupPage';
import ShopPage from './Pages/ShopPage/ShopPage';
import ContactPage from './Pages/ContactPage/ContactPage';
import Footer from './Components/Shared/Footer';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import { createContext, useEffect, useState } from 'react';

const dataContext = createContext();
function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
  }, [token]);

  const dataObject = {
    token,
    setToken,
  }

  return (
    <div>
      <dataContext.Provider value={dataObject}>
      <Navigation />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/topup' element={<TopupPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
      <Footer />
      <Toaster />
      </dataContext.Provider>
    </div>
  );
}

export default App;
export { dataContext };
