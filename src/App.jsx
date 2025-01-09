import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Ecommerce from './pages/home/Ecommerce';
import TShirtPage from './pages/products/TShirtPage';
import HoodiePage from './pages/products/HoodiePage';
import CapPage from './pages/products/CapPage';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ecommerce isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/products/tshirt" element={<TShirtPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/products/hoodie" element={<HoodiePage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
        <Route path="/products/cap" element={<CapPage isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />} />
      </Routes>
      <Link to="/hoodie">
        <button>Scopri di più sulla felpa</button>
      </Link>
    </Router>
  );
}

export default App;
