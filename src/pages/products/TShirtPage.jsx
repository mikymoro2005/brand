import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import HeaderEcommerce from '../../components/header-ecommerce/HeaderEcommerce';
import ModernFooter from '../../components/modern-footer/ModernFooter';
import './ProductPages.css';
import { useNavigate } from 'react-router-dom';

const TShirtPage = ({ isDarkMode, setIsDarkMode }) => {
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState(isDarkMode ? 'white' : 'black');
    const [selectedSize, setSelectedSize] = useState('M');
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    
    const y = useTransform(scrollY, [0, 300], [0, -50]);
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

    const handleColorChange = (color) => {
        setSelectedColor(color);
        setIsDarkMode(color === 'white');
    };

    useEffect(() => {
        setSelectedColor(isDarkMode ? 'white' : 'black');
    }, [isDarkMode]);

    const colors = {
        black: {
            name: 'Nero',
            hex: '#000000',
            textColor: isDarkMode ? '#ffffff' : '#1a1a1a'
        },
        white: {
            name: 'Bianco',
            hex: '#ffffff',
            textColor: isDarkMode ? '#ffffff' : '#1a1a1a'
        }
    };

    const getImageSource = () => {
        if (selectedColor === 'white') {
            return '/images/tshirt-white.png';
        }
        return isDarkMode ? '/images/tshirt-dark.png' : '/images/tshirt-light.png';
    };

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
                                src={`/images/tshirt-gallery${index}.png`} 
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
                        Acquista ora - €29.99
                    </motion.button>
                </div>
                <section className="purchase-section">
                    <div className="purchase-container">
                        <div className="purchase-info">
                            <h2>Essential Tee</h2>
                            <div className="purchase-details">
                                <div className="size-selector">
                                    <h3>Taglia selezionata</h3>
                                    <div className="size-buttons">
                                        <button className="size-button">S</button>
                                        <button className="size-button active">M</button>
                                        <button className="size-button">L</button>
                                        <button className="size-button">XL</button>
                                    </div>
                                </div>
                                <div className="color-preview">
                                    <h3>Colore</h3>
                                    <div className="selected-color">
                                        <span 
                                            className="color-dot" 
                                            style={{ background: colors[selectedColor].hex }}
                                        />
                                        <span>{colors[selectedColor].name}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="purchase-actions">
                                <div className="final-price">
                                    <span className="price-label">Prezzo</span>
                                    <span className="price-amount">€29.99</span>
                                </div>
                                <button className="add-to-cart-button">
                                    Aggiungi al carrello
                                </button>
                            </div>
                        </div>
                        <div className="product-features-mini">
                            <div className="feature-item">
                                <span className="feature-icon">🚚</span>
                                <div className="feature-text">
                                    <h4>Spedizione Gratuita</h4>
                                    <p>Consegna in 2-4 giorni lavorativi</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">↩️</span>
                                <div className="feature-text">
                                    <h4>Reso Facile</h4>
                                    <p>30 giorni per ripensarci</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        );
    };

    const handlePurchase = () => {
        navigate('/payment', { 
            state: { 
                product: {
                    name: "T-Shirt Oversize",
                    price: 29.99,
                    color: selectedColor === 'white' ? 'Bianco' : 'Nero',
                    size: selectedSize,
                    quantity: 1,
                    image: isDarkMode ? '/images/tshirt-dark.png' : '/images/tshirt-light.png'
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
                        <h1 style={{ color: colors[selectedColor].textColor }}>
                            Essential Tee
                        </h1>
                        <p className="tagline" style={{ color: colors[selectedColor].textColor }}>
                            Ridefinisci il tuo stile
                        </p>
                    </motion.div>

                    <motion.div 
                        className="main-product-image"
                        style={{ scale }}
                    >
                        <img 
                            src={getImageSource()}
                            alt="Essential Tee" 
                        />
                    </motion.div>

                    <motion.div 
                        className="scroll-indicator"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <FaChevronDown style={{ color: colors[selectedColor].textColor }} />
                    </motion.div>
                </motion.section>

                {/* Product Options */}
                <section className={`product-options ${selectedColor === 'white' ? 'white-product' : ''}`}>
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
                                        border: key === 'white' ? '1px solid #ddd' : 'none'
                                    }}
                                >
                                    <span className="color-name">{value.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="size-selector">
                        <h3>Seleziona la taglia</h3>
                        <div className="size-buttons">
                            {['S', 'M', 'L'].map((size) => (
                                <motion.button
                                    key={size}
                                    className={`size-button ${selectedSize === size ? 'active' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {size}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div className="buy-section">
                        <div className="price">€29.99</div>
                        <button 
                            className="buy-now" 
                            onClick={handlePurchase}
                            style={{ color: '#fff' }}
                        >
                            Acquista ora
                        </button>
                    </div>
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
                            <img src="/images/tshirt-detail1.png" alt="Dettaglio tessuto" />
                        </motion.div>
                        <div className="feature-content">
                            <h2>Tessuto Premium</h2>
                            <p>100% cotone biologico certificato. Morbidezza eccezionale e resistenza superiore.</p>
                        </div>
                    </div>

                    <div className="feature reverse">
                        <motion.div 
                            className="feature-image"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <img src="/images/tshirt-detail2.png" alt="Dettaglio cuciture" />
                        </motion.div>
                        <div className="feature-content">
                            <h2>Cuciture Perfette</h2>
                            <p>Ogni dettaglio è curato con precisione per garantire comfort e durata nel tempo.</p>
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
                                            border: key === 'white' ? '1px solid #ddd' : 'none'
                                        }}
                                    >
                                        <span className="color-name">{value.name}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="size-selector">
                            <h3>Seleziona la taglia</h3>
                            <div className="size-buttons">
                                {['S', 'M', 'L'].map((size) => (
                                    <motion.button
                                        key={size}
                                        className={`size-button ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {size}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div className="buy-section">
                            <div className="price">€29.99</div>
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

export default TShirtPage; 