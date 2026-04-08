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
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ALTOMÉ.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
