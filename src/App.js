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
import MessengerCustomerChat from 'react-messenger-customer-chat';

const dataContext = createContext();
function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [services, setServices] = useState([]);

  const getLoggedInUser = async () => {
    try {
      const url = `https://sourav-shop-server.up.railway.app/api/v1/auth/user/${userId}`
      const res = await fetch(url)

      const parseData = await res.json();
      setLoggedInUser(parseData);
    } catch (err) {
      console.error(err.message);
    }
  }

  const getAllService = async () => {
    try {
      const res = await fetch("https://sourav-shop-server.up.railway.app/api/v1/auth/service");
      const parseData = await res.json();
      setServices(parseData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAllService();
  }, [])

  console.log(services);


  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
    setUserId(localStorage.getItem('user_id'));
    if (userId) {
      getLoggedInUser();
    }
  }, [token, userId]);


  const dataObject = {
    token,
    setToken,
    userId,
    setUserId,
    loggedInUser,
    services
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
        <MessengerCustomerChat
          pageId="107411695538516"
          appId="664455595334952"
        />,
        <Footer />
        <Toaster />
      </dataContext.Provider>
    </div>
  );
}

export default App;
export { dataContext };
