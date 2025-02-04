import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaypal, FaCreditCard, FaLock, FaTruck, FaMapMarkerAlt } from 'react-icons/fa';
import HeaderEcommerce from '../../components/header-ecommerce/HeaderEcommerce';
import ModernFooter from '../../components/modern-footer/ModernFooter';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = ({ isDarkMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        country: 'IT'
    });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardInfo, setCardInfo] = useState({
        number: '',
        expiry: '',
        cvv: '',
        name: ''
    });

    const productData = location.state?.product || {
        name: "T-Shirt Oversize",
        price: 29.99,
        color: "Nero",
        size: "M",
        quantity: 1,
        image: '/images/tshirt-dark.png'
    };

    const orderDetails = {
        items: [
            {
                name: productData.name,
                price: productData.price,
                quantity: productData.quantity,
                color: productData.color,
                size: productData.size,
                image: productData.image
            }
        ],
        shipping: 4.99,
        total: productData.price + 4.99
    };

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setCurrentStep(2);
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simula il processamento del pagamento
            console.log('Processamento pagamento...');
            
            // Commenta temporaneamente l'invio email
            // await sendOrderConfirmation();
            
            // Reindirizza alla pagina di conferma
            setTimeout(() => {
                navigate('/confirmation');
            }, 2000);
        } catch (error) {
            console.error('Errore durante il pagamento:', error);
        }
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.join(' ');
    };

    return (
        <div className={`payment-page ${isDarkMode ? 'dark-mode' : ''}`}>
            <HeaderEcommerce isDarkMode={isDarkMode} />
            
            <div className="payment-layout">
                {/* Riepilogo Ordine */}
                <motion.div 
                    className="order-details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2>Riepilogo Ordine</h2>
                    <div className="order-items">
                        {orderDetails.items.map((item, index) => (
                            <div key={index} className="order-item">
                                <div className="item-image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p>Colore: {item.color}</p>
                                    <p>Taglia: {item.size}</p>
                                    <p>Quantità: {item.quantity}</p>
                                    <p className="item-price">€{item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-summary">
                        <div className="summary-row">
                            <span>Subtotale</span>
                            <span>€{orderDetails.items.reduce((acc, item) => acc + (item.price * item.quantity), 0).toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Spedizione</span>
                            <span>€{orderDetails.shipping.toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Totale</span>
                            <span>€{orderDetails.total.toFixed(2)}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Form Principale */}
                <motion.div 
                    className="payment-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {/* Progress Steps */}
                    <div className="progress-steps">
                        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                            <div className="step-number">1</div>
                            <span>Spedizione</span>
                        </div>
                        <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
                        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                            <div className="step-number">2</div>
                            <span>Pagamento</span>
                        </div>
                    </div>

                    {currentStep === 1 ? (
                        <motion.form 
                            className="shipping-form"
                            onSubmit={handleShippingSubmit}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h2><FaTruck /> Indirizzo di Spedizione</h2>
                            
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nome</label>
                                    <input 
                                        type="text"
                                        value={shippingInfo.firstName}
                                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Cognome</label>
                                    <input 
                                        type="text"
                                        value={shippingInfo.lastName}
                                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input 
                                        type="email"
                                        value={shippingInfo.email}
                                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Telefono</label>
                                    <input 
                                        type="tel"
                                        value={shippingInfo.phone}
                                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Indirizzo</label>
                                <input 
                                    type="text"
                                    value={shippingInfo.address}
                                    onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Città</label>
                                    <input 
                                        type="text"
                                        value={shippingInfo.city}
                                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>CAP</label>
                                    <input 
                                        type="text"
                                        value={shippingInfo.zipCode}
                                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button 
                                type="submit"
                                className="continue-button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Continua al Pagamento <FaLock />
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.div 
                            className="payment-section"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h2><FaCreditCard /> Metodo di Pagamento</h2>
                            
                            <div className="payment-methods">
                                <motion.button 
                                    className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('card')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaCreditCard /> Carta di Credito
                                </motion.button>
                                
                                <motion.button 
                                    className={`payment-method-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('paypal')}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <FaPaypal /> PayPal
                                </motion.button>
                            </div>

                            {paymentMethod === 'card' && (
                                <motion.form 
                                    className="payment-form"
                                    onSubmit={handlePaymentSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="form-group">
                                        <label>Numero Carta</label>
                                        <input 
                                            type="text"
                                            value={cardInfo.number}
                                            onChange={(e) => setCardInfo({...cardInfo, number: formatCardNumber(e.target.value)})}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                            required
                                        />
                                    </div>
                                    
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Scadenza</label>
                                            <input 
                                                type="text"
                                                value={cardInfo.expiry}
                                                onChange={(e) => {
                                                    let value = e.target.value.replace(/\D/g, '');
                                                    if (value.length >= 2) {
                                                        value = value.slice(0, 2) + '/' + value.slice(2, 4);
                                                    }
                                                    setCardInfo({...cardInfo, expiry: value});
                                                }}
                                                placeholder="MM/YY"
                                                maxLength="5"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="form-group">
                                            <label>CVV</label>
                                            <input 
                                                type="password"
                                                value={cardInfo.cvv}
                                                onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value.replace(/\D/g, '')})}
                                                placeholder="123"
                                                maxLength="3"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Nome sulla Carta</label>
                                        <input 
                                            type="text"
                                            value={cardInfo.name}
                                            onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                                            placeholder="Mario Rossi"
                                            required
                                        />
                                    </div>

                                    <motion.button 
                                        type="submit"
                                        className="submit-payment"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaLock /> Paga €{orderDetails.total.toFixed(2)}
                                    </motion.button>
                                </motion.form>
                            )}

                            {paymentMethod === 'paypal' && (
                                <div className="paypal-container">
                                    <p className="payment-info">
                                        Verrai reindirizzato a PayPal per completare il pagamento
                                    </p>
                                    <motion.button 
                                        className="paypal-button"
                                        onClick={handlePaymentSubmit}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <FaPaypal /> Paga con PayPal
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <ModernFooter isDarkMode={isDarkMode} />
        </div>
    );
};

export default PaymentPage; 