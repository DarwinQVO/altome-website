import { useLanguage } from '../../context/LanguageContext';
import secondaryImg from '../../assets/brand-continuity.png';
import './BrandContinuity.css';

const BrandContinuity = () => {
  const { t } = useLanguage();

  return (
    <section className="brand-continuity">
      <div className="bc-container">
        <div className="bc-image-wrapper">
          <img src={secondaryImg} alt="ALTOMÉ - Detalles de empaque" className="bc-image" />
        </div>
        <div className="bc-content">
          <h2 className="bc-title">{t('Lleva contigo un pedazo de nuestra historia.', 'Take a piece of our history with you.')}</h2>
          <p className="bc-subtitle">{t('Al abrir esta caja en casa, estarás compartiendo la calidez y el alma de México.', 'When you open this box at home, you will be sharing the warmth and soul of Mexico.')}</p>
          <a href="#" className="btn btn-secondary bc-btn">
            {t('Conocer más de ALTOMÉ', 'Discover ALTOMÉ')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default BrandContinuity;
