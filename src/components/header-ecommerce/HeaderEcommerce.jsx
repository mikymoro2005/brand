import React from 'react';
import './HeaderEcommerce.css';
import { 
    ShoppingBag, 
    Heart, 
    User 
} from "@phosphor-icons/react";

const HeaderEcommerce = ({ isDarkMode }) => {
    console.log('isDarkMode:', isDarkMode);
    return (
        <header className={`header-ecommerce ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="logo">
                <img 
                    src={isDarkMode ? "/images/logobianco.png" : "/images/logonero.png"}
                    alt="Logo" 
                    className="logo-image" 
                />
            </div>
            <nav className="nav-icons">
                <button className="icon-button">
                    <Heart size={24} weight="light" />
                    <span className="icon-label">Preferiti</span>
                </button>
                <button className="icon-button">
                    <ShoppingBag size={24} weight="light" />
                    <span className="icon-label">Carrello</span>
                </button>
                <button className="icon-button">
                    <User size={24} weight="light" />
                    <span className="icon-label">Account</span>
                </button>
            </nav>
        </header>
    );
};

export default HeaderEcommerce; 