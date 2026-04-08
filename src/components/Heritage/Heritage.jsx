import { useLanguage } from '../../context/LanguageContext';
import './Heritage.css';

const Heritage = () => {
  const { t } = useLanguage();

  return (
    <section className="heritage">
      <div className="heritage-container">
        <h2 className="heritage-title">
          {t('Nuestra Herencia', 'Our Heritage')}
        </h2>
        
        <div className="heritage-content">
          <p className="heritage-text">
            {t(
              'Más que un dulce, estás llevando siglos de tradición. La confitería mexicana nació de la fusión de dos mundos: el azúcar y las especias traídas de lejos, entrelazadas con las semillas, el amaranto y los frutos originarios de nuestras tierras.',
              'More than a sweet, you are holding centuries of tradition. Mexican confectionery was born from the fusion of two worlds: sugar and spices brought from afar, intertwined with the native seeds, amaranth, and fruits of our lands.'
            )}
          </p>
          <p className="heritage-text">
            {t(
              'Cada pieza en esta selección ha sido elaborada respetando técnicas ancestrales que han pasado de generación en generación, rindiendo homenaje a los conventos virreinales y a los dulces telares de nuestro pasado.',
              'Every piece in this selection has been crafted honoring ancestral techniques passed down through generations, paying homage to the colonial convents and the sweet heritage of our past.'
            )}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Heritage;
