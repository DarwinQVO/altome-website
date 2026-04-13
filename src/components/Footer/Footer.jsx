import { useLanguage } from '../../context/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-title">ALTOMÉ</h2>
          <p className="footer-tagline">
            {t(
              'Dulces tradicionales mexicanos · Presentación premium · Listo para regalar',
              'Traditional Mexican sweets · Premium presentation · Ready to gift'
            )}
          </p>
        </div>

        <div className="footer-links">
          <a href="https://www.tiktok.com/@altom9482?_r=1&_t=ZS-95Pc5gOn845" target="_blank" rel="noopener noreferrer">TikTok</a>
          <a href="https://www.instagram.com/dulces_altome?igsh=aHd5MWY5ajNtMWFi" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/share/1J52YLVVDq" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="mailto:dulcesaltome@gmail.com">Email</a>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ALTOMÉ.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
