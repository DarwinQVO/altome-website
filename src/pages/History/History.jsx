import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './History.css';

const History = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="history-page">
      <section className="history-hero">
        <div className="history-hero-content reveal-on-scroll">
          <span className="history-eyebrow">{t('Nuestra Herencia', 'Our Heritage')}</span>
          <h1>{t('Más que un sabor. Un linaje.', 'More than a flavor. A lineage.')}</h1>
          <p>{t('ALTOMÉ rescata el arte virreinal que nació del choque armónico entre el misticismo conventual español y el indómito paraíso tropical de México.', 'ALTOMÉ rescues the viceregal art born from the harmonious clash between Spanish conventual mysticism and Mexico’s untamed tropical paradise.')}</p>
        </div>
      </section>

      <section className="editorial-block bg-light">
        <div className="editorial-container stagger-reveal reveal-on-scroll">
          <div className="editorial-text">
            <h2>{t('Siglo XVI: Misticismo Conventual', '16th Century: Conventual Mysticism')}</h2>
            <p className="drop-cap">
              {t('Las imponentes gruesas paredes de los conventos novohispanos resguardaban un silencio sagrado, roto solo por el choque de morteros y el aroma a azúcar hirviendo.', 'The imposing thick walls of colonial convents harbored a sacred silence, broken only by the clash of mortars and the scent of boiling sugar.')}
            </p>
            <p>
              {t('Nuestras recetas fundacionales tienen su origen aquí. Cuando las monjas españolas se enfrentaron a la ausencia de almendras mediterráneas para sus mazapanes, observaron su entorno y abrazaron la semilla de calabaza (pepita). Fue un acto de alquimia culinaria: transformar una semilla endémica venerada por los mayas y aztecas, en un confite europeo de ultra lujo.', 'Our foundational recipes originate here. When Spanish nuns faced the absence of Mediterranean almonds for their marzipans, they observed their surroundings and embraced the native pumpkin seed (pepita). It was an act of culinary alchemy: transforming an endemic seed revered by Mayans and Aztecs into an ultra-luxury European confection.')}
            </p>
          </div>
          <div 
            className="editorial-image" 
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}history/siglo-xvi.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <span className="caption">{t('Paredes que forjaron la dulcería nacional', 'Walls that forged national confectionery')}</span>
          </div>
        </div>
      </section>

      <section className="editorial-block full-width bg-dark">
        <div className="editorial-container reverse stagger-reveal reveal-on-scroll">
          <div className="editorial-text light-text">
            <h2>{t('1565: La Nao de China', '1565: The Manila Galleon')}</h2>
            <p>
              {t('A través de los puertos de Acapulco entraron galeones repletos de tesoros asiáticos. Con ellos, llegó el coco y el tamarindo de la India. Estos ingredientes exóticos viajaron a través de montañas y valles, mezclándose con la caña de azúcar y los chiles originarios de nuestras tierras.', 'Through the ports of Acapulco entered galleons overflowing with Asian treasures. With them came coconut and Indian tamarind. These exotic ingredients traveled across mountains and valleys, mixing with the sugar cane and chilies native to our lands.')}
            </p>
            <p>
              {t('ALTOMÉ rinde tributo directo a esta ruta comercial. Cada Cocada crujiente y cada capa de Tamarindo picante encapsula siglos de un comercio global primitivo pero exquisito, logrando perfiles de sabor complejos, audaces y profundamente aromáticos.', 'ALTOMÉ pays a direct tribute to this trade route. Every crunchy Cocada and every layer of spicy Tamarind encapsulates centuries of a primitive yet exquisite global trade, achieving flavor profiles that are complex, bold, and deeply aromatic.')}
            </p>
          </div>
          <div 
            className="editorial-image" 
            style={{ backgroundImage: `url(${import.meta.env.BASE_URL}history/nao-de-china.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <span className="caption">{t('Acidez y especias, un viaje transoceánico', 'Acidity and spice, a transoceanic journey')}</span>
          </div>
        </div>
      </section>

      <section className="editorial-block legacy-block bg-light">
        <div className="legacy-content reveal-on-scroll">
          <h2>{t('El Legado Vivo: Arquitectura Gastronómica', 'The Living Legacy: Gastronomic Architecture')}</h2>
          <p>
            {t('Para nosotros, no son "dulces". Son piezas maestras botánicas.', 'To us, they are not strictly "sweets". They are botanical masterpieces.')}
          </p>
          <div className="divider-line"></div>
          <p className="philosophy-text">
            {t('Conservamos la densidad exacta del azúcar, tostamos las semillas a un nivel milimétrico para desdoblar sus aceites esenciales, y empaquetamos el resultado con la reverencia de la alta joyería contemporánea. ALTOMÉ es un pedazo esculpido de México, listo para regalarse al mundo.', 'We preserve the exact density of the sugar, toast the seeds on a millimeter level to unfold their essential oils, and package the result with the reverence of contemporary high jewelry. ALTOMÉ is a sculpted piece of Mexico, ready to be gifted to the world.')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default History;
