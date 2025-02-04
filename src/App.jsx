import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Ecommerce from './pages/home/Ecommerce';
import TShirtPage from './pages/products/TShirtPage';
import HoodiePage from './pages/products/HoodiePage';
import CapPage from './pages/products/CapPage';
import PaymentPage from './pages/payment/PaymentPage';
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
        <Route path="/payment" element={<PaymentPage isDarkMode={isDarkMode} />} />
      </Routes>
    </Router>
  );
}

export default App;
