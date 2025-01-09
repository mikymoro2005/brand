import React from 'react';
import './FooterEcommerce.css';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const FooterEcommerce = ({ isDarkMode }) => {
    return (
        <footer className={`footer-ecommerce ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Contatti</h3>
                    <p>Email: info@example.com</p>
                    <p>Tel: +39 123 456 7890</p>
                </div>
                <div className="footer-section">
                    <h3>Social</h3>
                    <div className="social-links">
                        <a href="#"><FaGithub /></a>
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h3>Newsletter</h3>
                    <form className="newsletter-form">
                        <input type="email" placeholder="La tua email" />
                        <button type="submit">Iscriviti</button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Il tuo E-commerce. Tutti i diritti riservati.</p>
            </div>
        </footer>
    );
};

export default FooterEcommerce; 