import './App.css';
import Navigation from './Components/Shared/Navigation';
import LandingPage from './Pages/LandingPage/LandingPage';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import TopupPage from './Pages/TouupPage/TopupPage';
import ShopPage from './Pages/ShopPage/ShopPage';
import ContactPage from './Pages/ContactPage/ContactPage';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/topup' element={<TopupPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/contact' element={<ContactPage />} />
       </Routes>
    </div>
  );
}

export default App;
