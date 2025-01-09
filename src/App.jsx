import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HeaderEcommerce from './components/header-ecommerce/HeaderEcommerce';
import Ecommerce from './pages/home/Ecommerce';
import './App.css';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => Math.random() < 0.5);

    return (
        <Router>
            <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
                <HeaderEcommerce isDarkMode={isDarkMode} />
                <main>
                    <Ecommerce isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
                </main>
            </div>
        </Router>
    );
}

export default App;
