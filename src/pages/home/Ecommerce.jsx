import { useState, useRef, useEffect } from 'react';
import './Ecommerce.css';
import HeaderEcommerce from '../../components/header-ecommerce/HeaderEcommerce';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaArrowRight } from 'react-icons/fa';
import ModernFooter from '../../components/modern-footer/ModernFooter';
import { Link, useNavigate } from 'react-router-dom';

const Ecommerce = ({ isDarkMode, setIsDarkMode }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const sections = useRef([]);
    const isScrolling = useRef(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const slideToSection = (index) => {
        if (isScrolling.current) return;
        
        isScrolling.current = true;
        setCurrentSection(index);
        setIsDarkMode(prev => !prev);

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

    const handleSubscribe = (e) => {
        e.preventDefault();
        console.log(`Iscritto alla newsletter con l'email: ${email}`);
        setEmail('');
    };

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            
            const delta = e.deltaY;

            if (delta > 0 && currentSection < 3) {
                slideToSection(currentSection + 1);
            } else if (delta < 0 && currentSection > 0) {
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
                    style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }}
                >
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={`tshirt-${isDarkMode}`}
                            className="hero-image"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ 
                                opacity: currentSection === 0 ? 1 : 0, 
                                x: currentSection === 0 ? 0 : 30 
                            }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ 
                                duration: 1.2,
                                delay: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <img 
                                src={isDarkMode ? "/images/tshirt-dark.png" : "/images/tshirt-light.png"}
                                alt="T-Shirt Oversize" 
                            />
                        </motion.div>
                    </AnimatePresence>

                    <motion.div 
                        className="hero-content"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ 
                            opacity: currentSection === 0 ? 1 : 0, 
                            y: currentSection === 0 ? 0 : 30 
                        }}
                        transition={{ 
                            duration: 1.2,
                            delay: 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        <h1 style={{ color: isDarkMode ? '#fff' : '#000' }}>t-shirt oversize</h1>
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
                            <button 
                                className="buy-button" 
                                onClick={() => navigate('/payment')}
                                style={{ color: '#fff' }}
                            >
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
                            <Link to="/products/hoodie" className="discover-more">
                                Scopri di più <FaArrowRight />
                            </Link>
                            <button 
                                className="buy-button" 
                                onClick={() => navigate('/payment')}
                                style={{ color: '#fff' }}
                            >
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
                                <button 
                                    className="buy-button" 
                                    onClick={() => navigate('/payment')}
                                    style={{ color: '#fff' }}
                                >
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
                        {/* Qui puoi aggiungere altre informazioni se necessario */}
                    </motion.div>

                    {/* Sezione Newsletter */}
                    <div className="newsletter-full" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%', padding: '2rem' }}>
                        <motion.div 
                            className="newsletter-content"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            style={{ 
                                width: '100%', 
                                textAlign: 'center', 
                                background: '#333', // Cambiato in grigio scuro
                                borderRadius: '10px', 
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', 
                                padding: '2rem', 
                                color: '#fff', // Cambiato il colore del testo in bianco per contrasto
                            }}
                        >
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Iscriviti alla nostra Newsletter</h2>
                            <form onSubmit={handleSubscribe} className="newsletter-form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <input 
                                    type="email" 
                                    placeholder="Inserisci la tua email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    required 
                                    style={{ width: '80%', padding: '1rem', marginBottom: '1rem' }}
                                />
                                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>Iscrivendoti riceverai un 10% di sconto!</p>
                                <button type="submit" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>Iscriviti</button>
                            </form>
                            
                        </motion.div>
                    </div>

                    <ModernFooter isDarkMode={isDarkMode} />
                </section>
            </motion.div>
        </div>
    );
};

export default Ecommerce; 