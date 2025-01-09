import React, { useState, useEffect, useRef } from 'react';
import './Ecommerce.css';
import HeaderEcommerce from '../../components/header-ecommerce/HeaderEcommerce';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';

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

            if (delta > 0 && currentSection < 2) {
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
                            <button className="discover-more">
                                Scopri di più <FaArrowRight />
                            </button>
                            <button className="buy-button">
                                Acquista <FaShoppingCart />
                            </button>
                        </div>
                    </motion.div>
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
                            <button className="discover-more">
                                Scopri di più <FaArrowRight />
                            </button>
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
                                <button className="discover-more">
                                    Scopri di più <FaArrowRight />
                                </button>
                                <button className="buy-button">
                                    Acquista <FaShoppingCart />
                                </button>
                            </div>
                            <p className="price">€24.99</p>
                        </motion.div>
                    </div>
                </section>
            </motion.div>
        </div>
    );
};

export default Ecommerce; 