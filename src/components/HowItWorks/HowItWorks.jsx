import { useLanguage } from '../../context/LanguageContext';
import './HowItWorks.css';

const HowItWorks = () => {
  const { t } = useLanguage();

  const copy = {
    title: t('Cómo se entrega', 'How it is prepared'),
    desc1: t(
      'ALTOMÉ está diseñado para ofrecer una compra más clara y confiable.', 
      'ALTOMÉ is designed to offer a clearer, more reliable purchase experience.'
    ),
    desc2: t(
      'Según el punto de venta, tu selección puede prepararse de dos formas:', 
      'Depending on the point of sale, your selection may be prepared in two ways:'
    ),
    cards: [
      {
        title: 'Mix & match',
        text: t('Tú eliges las piezas y el operador arma, cierra, sella y entrega.', 'You choose the pieces, and the operator assembles, closes, seals, and delivers.')
      },
      {
        title: t('Mixes prearmados', 'Pre-packed mixes'),
        text: t('Combinaciones listas para compra directa, pensadas para mayor rapidez.', 'Ready-to-buy combinations designed for greater speed.')
      }
    ],
    signalsTitle: t('Señales de confianza visibles', 'Visible trust signals'),
    signals: t(
      'Vitrina cerrada · Pinzas por SKU · Cierre y sello · Información clara',
      'Closed display · Dedicated tongs · Closure and seal · Clear information'
    )
  };

  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="hiw-header">
          <h2 className="hiw-title">{copy.title}</h2>
          <p className="hiw-description">
            {copy.desc1}
            <br />
            {copy.desc2}
          </p>
        </div>

        <div className="formats-grid">
          {copy.cards.map((card, idx) => (
            <div key={idx} className="format-card">
              <h3 className="format-title">{card.title}</h3>
              <p className="format-description">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="trust-signals-bar">
          <h4 className="signals-title">{copy.signalsTitle}</h4>
          <p className="signals-list">{copy.signals}</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
