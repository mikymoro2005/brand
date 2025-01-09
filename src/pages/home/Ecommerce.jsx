import React, { useState, useEffect, useRef } from 'react';
import './Ecommerce.css';
import HeaderEcommerce from '../../components/header-ecommerce/HeaderEcommerce';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import ModernFooter from '../../components/modern-footer/ModernFooter';
import { Link } from 'react-router-dom';

const Ecommerce = ({ isDarkMode, setIsDarkMode }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const sections = useRef([]);
    const isScrolling = useRef(false);

    const slideToSection = (index) => {
        if (isScrolling.current) return;
        
        isScrolling.current = true;
        setCurrentSection(index);
        setIsDarkMode(prev => !prev);

        // Animazione fluida con framer-motion
        const targetSection = sections.current[index];
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }

        setTimeout(() => {
            isScrolling.current = false;
        }, 1000);
    };

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            
            const delta = e.deltaY;

            if (delta > 0 && currentSection < 3) {
                // Scroll verso il basso
                slideToSection(currentSection + 1);
            } else if (delta < 0 && currentSection > 0) {
                // Scroll verso l'alto
                slideToSection(currentSection - 1);
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => window.removeEventListener('wheel', handleWheel);
    }, [currentSection]);

    return (
        <div className={`ecommerce-wrapper ${isDarkMode ? 'dark-mode' : ''}`}>
            <HeaderEcommerce isDarkMode={isDarkMode} />
            
            <motion.div 
                className="sections-container"
                animate={{ y: `${-currentSection * 100}vh` }}
                transition={{ 
                    type: "spring",
                    stiffness: 50,
                    damping: 20
                }}
            >
                {/* T-Shirt Section */}
                <section 
                    ref={el => sections.current[0] = el}
                    className="hero-product tshirt-section"
                >
                    <motion.div 
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1>Essential Tee</h1>
                        <p className="subtitle">Ridefinisci il tuo stile</p>
                        <p className="price">€29.99</p>
                        <div className="cta-buttons">
                            <button 
                                className={`learn-more ${isDarkMode ? 'dark' : ''}`}
                                onClick={() => setIsDarkMode(!isDarkMode)}
                            >
                                {isDarkMode ? 'Modalità Light' : 'Modalità Dark'} <FaArrowRight />
                            </button>
                            <Link to="/products/tshirt" className="discover-more">
                                Scopri di più <FaArrowRight />
                            </Link>
                            <button className="buy-button">
                                Acquista <FaShoppingCart />
                            </button>
                        </div>
                    </motion.div>
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={`tshirt-${isDarkMode}`}
                            className="hero-image"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ 
                                opacity: currentSection === 0 ? 1 : 0, 
                                x: currentSection === 0 ? 0 : -30 
                            }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ 
                                duration: 1.2,
                                delay: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <img 
                                src={isDarkMode ? "/images/tshirt-dark.png" : "/images/tshirt-light.png"}
                                alt="Essential Tee" 
                            />
                        </motion.div>
                    </AnimatePresence>
                </section>

                {/* Hoodie Section */}
                <section 
                    ref={el => sections.current[1] = el}
                    className="hero-product hoodie-section"
                >
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={`hoodie-${isDarkMode}`}
                            className="hero-image"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ 
                                opacity: currentSection === 1 ? 1 : 0, 
                                x: currentSection === 1 ? 0 : -30 
                            }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ 
                                duration: 1.2,
                                delay: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <img 
                                src={isDarkMode ? "/images/hoodie-dark.png" : "/images/hoodie-light.png"}
                                alt="Premium Hoodie" 
                            />
                        </motion.div>
                    </AnimatePresence>

                    <motion.div 
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ 
                            opacity: currentSection === 1 ? 1 : 0, 
                            y: currentSection === 1 ? 0 : 30 
                        }}
                        transition={{ 
                            duration: 1.2,
                            delay: 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        <h1>Premium Hoodie</h1>
                        <p className="subtitle">Comfort senza compromessi</p>
                        <p className="price">€59.99</p>
                        <div className="cta-buttons">
                            <button 
                                className={`learn-more ${isDarkMode ? 'dark' : ''}`}
                                onClick={() => setIsDarkMode(!isDarkMode)}
                            >
                                {isDarkMode ? 'Modalità Light' : 'Modalità Dark'} <FaArrowRight />
                            </button>
                            <Link to="/products/hoodie" className="discover-more">
                                Scopri di più <FaArrowRight />
                            </Link>
                            <button className="buy-button">
                                Acquista <FaShoppingCart />
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* Cap Section */}
                <section 
                    ref={el => sections.current[2] = el}
                    className="hero-product cap-section"
                >
                    <div className="cap-layout">
                        <motion.div 
                            className="cap-image"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ 
                                opacity: currentSection === 2 ? 1 : 0, 
                                y: currentSection === 2 ? 0 : -30 
                            }}
                            transition={{ 
                                duration: 1.2,
                                delay: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <img 
                                src={isDarkMode ? "/images/cap-dark.png" : "/images/cap-light.png"}
                                alt="Classic Cap" 
                            />
                        </motion.div>

                        <motion.div 
                            className="center-content"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ 
                                opacity: currentSection === 2 ? 1 : 0, 
                                y: currentSection === 2 ? 0 : 30 
                            }}
                            transition={{ 
                                duration: 1.2,
                                delay: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <h1>Classic Cap</h1>
                            <p className="subtitle">Stile senza tempo</p>
                            <div className="cta-buttons">
                                <button 
                                    className={`learn-more ${isDarkMode ? 'dark' : ''}`}
                                    onClick={() => setIsDarkMode(!isDarkMode)}
                                >
                                    {isDarkMode ? 'Modalità Light' : 'Modalità Dark'} <FaArrowRight />
                                </button>
                                <Link to="/products/cap" className="discover-more">
                                    Scopri di più <FaArrowRight />
                                </Link>
                                <button className="buy-button">
                                    Acquista <FaShoppingCart />
                                </button>
                            </div>
                            <p className="price">€24.99</p>
                        </motion.div>
                    </div>
                </section>

                {/* Info Section */}
                <section 
                    ref={el => sections.current[3] = el}
                    className="hero-product info-section"
                >
                    <motion.div 
                        className="info-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ 
                            opacity: currentSection === 3 ? 1 : 0, 
                            y: currentSection === 3 ? 0 : 30 
                        }}
                        transition={{ 
                            duration: 1.2,
                            delay: 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        <motion.div 
                            className="bio-cotton-box"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ 
                                scale: currentSection === 3 ? 1 : 0.9,
                                opacity: currentSection === 3 ? 1 : 0
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                                ease: "easeOut"
                            }}
                        >
                            <div className="philosophy-badge">BRAND</div>
                            <h2 className="bio-cotton-title">La Nostra Filosofia</h2>
                            <div className="philosophy-grid">
                                <motion.div 
                                    className="philosophy-item"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="philosophy-icon">🌱</span>
                                    <h3>Sostenibilità</h3>
                                    <p>Ogni capo racconta una storia di rispetto per l'ambiente</p>
                                </motion.div>
                                <motion.div 
                                    className="philosophy-item"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="philosophy-icon">✨</span>
                                    <h3>Design</h3>
                                    <p>Minimalismo ed eleganza in ogni dettaglio</p>
                                </motion.div>
                                <motion.div 
                                    className="philosophy-item"
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="philosophy-icon">♻️</span>
                                    <h3>Circolarità</h3>
                                    <p>Materiali riciclabili e packaging eco-friendly</p>
                                </motion.div>
                            </div>
                            <div className="philosophy-quote">
                                <p>"Creiamo moda che dura nel tempo, non nelle tendenze"</p>
                            </div>
                        </motion.div>
                    </motion.div>
                    <ModernFooter isDarkMode={isDarkMode} />
                </section>
            </motion.div>
        </div>
    );
};

export default Ecommerce; 