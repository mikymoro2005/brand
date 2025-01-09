import React from 'react';
import { motion } from 'framer-motion';
import './ProductPages.css';

const CapPage = ({ isDarkMode }) => {
    return (
        <div className={`product-page ${isDarkMode ? 'dark-mode' : ''}`}>
            <motion.div 
                className="product-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="product-gallery">
                    <motion.img 
                        src={isDarkMode ? "/images/cap-dark.png" : "/images/cap-light.png"}
                        alt="Classic Cap"
                        className="main-image"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                    />
                    <div className="thumbnail-gallery">
                        <img src="/images/cap-detail1.png" alt="Detail 1" />
                        <img src="/images/cap-detail2.png" alt="Detail 2" />
                        <img src="/images/cap-detail3.png" alt="Detail 3" />
                    </div>
                </div>
                
                <div className="product-info">
                    <h1>Classic Cap</h1>
                    <p className="price">€24.99</p>
                    <div className="product-description">
                        <p>Il nostro Classic Cap unisce stile minimalista e comfort quotidiano. Con la sua struttura a 6 pannelli e la visiera precurvata, si adatta perfettamente a ogni look.</p>
                        
                        <div className="product-features">
                            <h3>Caratteristiche</h3>
                            <ul>
                                <li>100% cotone twill</li>
                                <li>Struttura a 6 pannelli</li>
                                <li>Visiera precurvata</li>
                                <li>Chiusura regolabile</li>
                            </ul>
                        </div>

                        <div className="size-selector">
                            <h3>Taglie</h3>
                            <div className="size-options">
                                <button>Unica</button>
                            </div>
                        </div>

                        <button className="add-to-cart">
                            Aggiungi al Carrello
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CapPage; 