import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeaderEcommerce from '../../components/header-ecommerce/HeaderEcommerce';
import ModernFooter from '../../components/modern-footer/ModernFooter';
import './ProductPages.css';
import { useNavigate } from 'react-router-dom';

const CapPage = ({ isDarkMode, setIsDarkMode }) => {
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState('dark');
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    
    const y = useTransform(scrollY, [0, 300], [0, -50]);
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setIsDarkMode(color === 'light');
    };

    const colors = {
        dark: {
            name: 'Nero',
            hex: '#000000',
            textColor: '#fff'
        },
        light: {
            name: 'Beige',
            hex: '#f5f5dc',
            textColor: '#000'
        }
    };

    const getImageSource = () => {
        return isDarkMode ? '/images/cap-dark.png' : '/images/cap-light.png';
    };

    const textColor = isDarkMode ? '#fff' : '#000';

    const GallerySection = () => {
        const galleryRef = useRef(null);
        const [canScrollLeft, setCanScrollLeft] = useState(false);
        const [canScrollRight, setCanScrollRight] = useState(true);

        const handleScroll = () => {
            if (galleryRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = galleryRef.current;
                setCanScrollLeft(scrollLeft > 0);
                setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
            }
        };

        const scroll = (direction) => {
            if (galleryRef.current) {
                const scrollAmount = galleryRef.current.clientWidth;
                galleryRef.current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                });
            }
        };

        useEffect(() => {
            const gallery = galleryRef.current;
            if (gallery) {
                gallery.addEventListener('scroll', handleScroll);
                return () => gallery.removeEventListener('scroll', handleScroll);
            }
        }, []);

        return (
            <section className="gallery-section">
                <div 
                    className="gallery-container" 
                    ref={galleryRef}
                    onScroll={handleScroll}
                >
                    {[1, 2, 3, 4, 5].map((index) => (
                        <motion.div 
                            key={index}
                            className="gallery-item"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <img 
                                src={`/images/cap-gallery${index}.png`} 
                                alt={`Gallery ${index}`} 
                            />
                        </motion.div>
                    ))}
                </div>
                <div className="gallery-controls">
                    <motion.button
                        className="gallery-button"
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaChevronLeft />
                    </motion.button>
                    <motion.button
                        className="gallery-button"
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaChevronRight />
                    </motion.button>
                </div>
                <div className="purchase-button-container">
                    <motion.button 
                        className="buy-now gallery-buy-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/payment')}
                        style={{ color: '#fff' }}
                    >
                        Acquista ora - €19.99
                    </motion.button>
                </div>
            </section>
        );
    };

    const handlePurchase = () => {
        navigate('/payment', { 
            state: { 
                product: {
                    name: "Berretta Essential",
                    price: 24.99,
                    color: selectedColor === 'light' ? 'Beige' : 'Nero',
                    quantity: 1,
                    image: isDarkMode ? '/images/cap-dark.png' : '/images/cap-light.png'
                }
            }
        });
    };

    return (
        <>
            <HeaderEcommerce isDarkMode={isDarkMode} />
            <div className={`apple-style-page ${isDarkMode ? 'dark-mode' : ''}`} ref={containerRef}>
                <motion.section 
                    className="hero-section"
                    style={{ y, opacity }}
                >
                    <motion.div 
                        className="product-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1>Berretta Essential</h1>
                        <p className="tagline">Stile senza tempo</p>
                    </motion.div>

                    <motion.div 
                        className="main-product-image"
                        style={{ scale }}
                    >
                        <img 
                            src={getImageSource()}
                            alt="Essential Cap" 
                        />
                    </motion.div>

                    <motion.div 
                        className="scroll-indicator"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <FaChevronDown style={{ color: textColor }} />
                    </motion.div>
                </motion.section>

                {/* Product Options */}
                <section 
                    className={`product-options ${selectedColor === 'white' ? 'white-product' : ''}`} 
                    style={{ background: isDarkMode ? '#444444' : '#c3c3c3' }}
                >
                    <div className="color-selector">
                        <h3 style={{ color: textColor }}>Seleziona il colore</h3>
                        <div className="color-options">
                            <motion.button
                                key="dark"
                                className={`color-option ${selectedColor === 'dark' ? 'selected' : ''}`}
                                onClick={() => handleColorChange('dark')}
                                whileHover={{ scale: 1.1 }}
                                style={{ 
                                    background: '#1a1a1a', // Nero
                                    color: '#fff' // Testo bianco
                                }}
                            >
                                <span className="color-name">Nero</span>
                            </motion.button>
                            <motion.button
                                key="light"
                                className={`color-option ${selectedColor === 'light' ? 'selected' : ''}`}
                                onClick={() => handleColorChange('light')}
                                whileHover={{ scale: 1.1 }}
                                style={{ 
                                    background: '#f5f5f7', // Beige
                                    color: '#fff' // Testo bianco
                                }}
                            >
                                <span className="color-name">Beige</span>
                            </motion.button>
                        </div>
                    </div>

                    <motion.div 
                        className="buy-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="price" style={{ color: textColor }}>€19.99</div>
                        <button 
                            className="buy-now" 
                            onClick={() => navigate('/payment')}
                            style={{ color: '#fff' }}
                        >
                            Acquista ora
                        </button>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="feature">
                        <motion.div 
                            className="feature-image"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img src="/images/cap-detail1.png" alt="Dettaglio tessuto" />
                        </motion.div>
                        <div className="feature-content">
                            <h2 style={{ color: textColor }}>Tessuto Premium</h2>
                            <p style={{ color: textColor }}>100% cotone biologico certificato. Morbidezza eccezionale e resistenza superiore.</p>
                        </div>
                    </div>

                    <div className="feature reverse">
                        <motion.div 
                            className="feature-image"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img src="/images/cap-detail2.png" alt="Dettaglio cuciture" />
                        </motion.div>
                        <div className="feature-content">
                            <h2 style={{ color: textColor }}>Cuciture Perfette</h2>
                            <p style={{ color: textColor }}>Ogni dettaglio è curato con precisione per garantire comfort e durata nel tempo.</p>
                        </div>
                    </div>
                </section>

                <GallerySection />

                <div className="purchase-button-container">
                    <section className="product-options">
                        <div className="color-selector">
                            <h3>Seleziona il colore</h3>
                            <div className="color-options">
                                {Object.entries(colors).map(([key, value]) => (
                                    <motion.button
                                        key={key}
                                        className={`color-option ${selectedColor === key ? 'selected' : ''}`}
                                        onClick={() => handleColorChange(key)}
                                        whileHover={{ scale: 1.1 }}
                                        style={{ 
                                            background: value.hex,
                                            border: key === 'light' ? '1px solid #ddd' : 'none'
                                        }}
                                    >
                                        <span className="color-name">{value.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="buy-section">
                            <div className="price">€24.99</div>
                            <button 
                                className="buy-now" 
                                onClick={handlePurchase}
                                style={{ color: '#fff' }}
                            >
                                Acquista ora
                            </button>
                        </div>
                    </section>
                </div>

                <ModernFooter isDarkMode={isDarkMode} />
            </div>
        </>
    );
};

export default CapPage; 