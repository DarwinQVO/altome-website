import { useLanguage } from '../../context/LanguageContext';
import './Trust.css';

const Trust = () => {
  const { t } = useLanguage();

  return (
    <section className="info-util">
      <div className="info-util-container">
        <h2 className="info-title">{t('Información útil', 'Useful information')}</h2>
        
        <div className="info-content">
          <p className="info-intro">{t('Disponible en:', 'Available in:')}</p>
          <ul className="info-list">
            <li>{t('Pieza individual', 'Individual piece')}</li>
            <li>{t('Caja de 6', '6-piece box')}</li>
            <li>{t('Caja de 12', '12-piece box')}</li>
          </ul>

          <div className="info-highlight">
            <p>
              {t('Nuestro ', 'Our ')}
              <strong>{t('mazapán de pepita', 'pumpkin seed marzipan')}</strong>
              {t(' se mantiene como la pieza firma del conjunto.', ' remains the signature piece of the collection.')}
            </p>
          </div>

          <p className="info-intro">{t('Consulta en la etiqueta física:', 'Please check the physical label for:')}</p>
          <ul className="info-list info-list-secondary">
            <li>{t('ingredientes', 'ingredients')}</li>
            <li>{t('alérgenos', 'allergens')}</li>
            <li>{t('lote y fecha, cuando aplique', 'batch and date, when applicable')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Trust;
