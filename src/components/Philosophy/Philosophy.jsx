import { useLanguage } from '../../context/LanguageContext';
import './Philosophy.css';

const Philosophy = () => {
  const { t } = useLanguage();
  return (
    <section className="philosophy">
      <div className="philosophy-container">
        <h2 className="philosophy-subtitle">{t('Una Tradición Reinventada', 'A Reinvented Tradition')}</h2>
        <h3 className="philosophy-title">{t('Souvenir Gastronómico Premium', 'Premium Gastronomic Souvenir')}</h3>
        <p className="philosophy-text">
          {t(
            'ALTOMÉ no es una dulcería genérica. Es una selección curada de dulces tradicionales mexicanos pensada para quienes buscan llevarse un fragmento auténtico de México, presentado en un formato elegante, listo para regalar y meticulosamente empacado para viajar bien.',
            'ALTOMÉ is not a generic candy store. It is a curated selection of traditional Mexican sweets designed for those seeking to take home an authentic piece of Mexico, presented in an elegant format, ready to gift and meticulously packaged to travel well.'
          )}
        </p>
        
        <div className="philosophy-pillars">
          <div className="pillar">
            <h4 className="pillar-title">{t('Selección Curada', 'Curated Selection')}</h4>
            <p className="pillar-text">{t('Nueve sabores tradicionales que representan lo mejor de la confitería mexicana.', 'Nine traditional flavors representing the best of Mexican confectionery.')}</p>
          </div>
          <div className="pillar">
            <h4 className="pillar-title">{t('Presentación Premium', 'Premium Presentation')}</h4>
            <p className="pillar-text">{t('Empaques rígidos con diseño botánico, listos para regalar sin fricción.', 'Rigid packaging with botanical design, ready for seamless gifting.')}</p>
          </div>
          <div className="pillar">
            <h4 className="pillar-title">{t('Hecho para Viajar', 'Made to Travel')}</h4>
            <p className="pillar-text">{t('Sellado impecable, orden estético y formatos que se adaptan a cualquier viaje.', 'Impeccable sealing, aesthetic order, and formats that adapt to any trip.')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
