import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLanguage, t } = useLanguage();
  const { setIsCartOpen, totalItems } = useCart();
  const { currency, toggleCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <NavLink to="/" onClick={() => setIsMenuOpen(false)}>ALTOMÉ</NavLink>
        </div>
        
        <button className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <div className="hamburger-bar"></div>
          <div className="hamburger-bar"></div>
          <div className="hamburger-bar"></div>
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{t('Inicio', 'Home')}</NavLink>
          <NavLink to="/shop" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{t('Tienda', 'Shop')}</NavLink>
          <NavLink to="/historia" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{t('Historia', 'Story')}</NavLink>
          <NavLink to="/b2b" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{t('B2B Hotelería', 'B2B Hospitality')}</NavLink>
          <NavLink to="/faq" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>FAQ</NavLink>
        </nav>

        <div className="header-actions">
          <button 
            className="cart-toggle-btn" 
            onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }}
          >
            {t('Carrito', 'Cart')} <span className="cart-count">{totalItems}</span>
          </button>
          
          <div className="lang-switcher">
            <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLanguage('es')}>ES</button>
            <span className="lang-divider">|</span>
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
          </div>

          <div className="currency-switcher">
            <button className="currency-btn" onClick={toggleCurrency}>{currency}</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
