import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLanguage, t } = useLanguage();
  const { setIsCartOpen, totalItems } = useCart();
  const { currency, toggleCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-logo">
          <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>ALTOMÉ</NavLink>
        </div>
        
        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{t('Inicio', 'Home')}</NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{t('Tienda', 'Shop')}</NavLink>
          <NavLink to="/historia" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{t('Historia', 'Story')}</NavLink>
          <NavLink to="/b2b" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>{t('B2B Hotelería', 'B2B Hospitality')}</NavLink>
          <NavLink to="/faq" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>FAQ</NavLink>
        </nav>

        <div className="lang-toggle-wrapper" style={{display: 'flex', alignItems: 'center', gap: '1.5rem'}}>
          <button 
            className="cart-toggle-btn" 
            onClick={() => setIsCartOpen(true)}
            style={{background: 'none', border:'none', color:'inherit', cursor:'pointer', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: '500', display:'flex', alignItems:'center', gap:'0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em'}}
          >
            {t('Carrito', 'Cart')} <span style={{background:'var(--color-emerald-deep)', color:'white', borderRadius:'10px', padding:'2px 8px', fontSize:'0.7rem', fontWeight:'700'}}>{totalItems}</span>
          </button>
          
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <button className={`lang-btn ${lang === 'es' ? 'active' : ''}`} onClick={() => setLanguage('es')}>ES</button>
            <span className="lang-divider">|</span>
            <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>EN</button>
          </div>

          <div className="currency-toggle" style={{display: 'flex', alignItems: 'center', gap: '0.4rem', borderLeft: '1px solid var(--color-border)', paddingLeft: '1rem' }}>
            <button 
              className="lang-btn" 
              onClick={toggleCurrency}
              style={{ fontWeight: '700', color: 'var(--color-emerald-deep)' }}
            >
              {currency}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
