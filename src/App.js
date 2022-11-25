import './App.css';
import Navigation from './Components/Shared/Navigation';
import LandingPage from './Pages/LandingPage/LandingPage';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div>
      <Navigation />
       <LandingPage />
    </div>
  );
}

export default App;
