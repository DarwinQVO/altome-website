import { useLanguage } from '../../context/LanguageContext';
import './Locations.css';

const Locations = () => {
  const { t } = useLanguage();
  
  const locations = [
    {
      type: t('Hoteles Premium', 'Premium Hotels'),
      desc: t(
        'Disponible en las boutiques y gift shops de los hoteles más exclusivos de Cancún y la Riviera Maya.',
        'Available in the boutiques and gift shops of the most exclusive hotels in Cancun and Riviera Maya.'
      )
    },
    {
      type: t('Boutiques Curadas', 'Curated Boutiques'),
      desc: t(
        'Encuentra nuestra exhibición y vitrinas en espacios seleccionados de alto diseño y artesanía contemporánea.',
        'Find our displays and showcases in selected spaces of high design and contemporary craftsmanship.'
      )
    },
    {
      type: t('Aeropuerto (Próximamente)', 'Airport (Coming Soon)'),
      desc: t(
        'El último pedazo de México antes de tu vuelo, listo para llevar.',
        'The last piece of Mexico before your flight, ready to take with you.'
      )
    }
  ];

  return (
    <section className="locations">
      <div className="locations-container">
        <h2 className="locations-subtitle">{t('Dónde Encontrarnos', 'Where to Find Us')}</h2>
        <h3 className="locations-title">{t('Puntos de Venta Exclusivos', 'Exclusive Points of Sale')}</h3>
        <p className="locations-description">
          {t(
            'ALTOMÉ está presente donde importa. Nuestra selección te espera en los puntos turísticos más cuidados de la región.',
            'ALTOMÉ is present where it matters. Our selection awaits you at the most carefully chosen tourist spots in the region.'
          )}
        </p>

        <div className="locations-grid">
          {locations.map((loc, index) => (
            <div key={index} className="location-card">
              <h4 className="location-type">{loc.type}</h4>
              <p className="location-desc">{loc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
