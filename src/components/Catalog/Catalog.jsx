import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { animate, stagger } from 'animejs';
import './Catalog.css';

const Catalog = () => {
  const { t } = useLanguage();
  const [selectedSku, setSelectedSku] = useState(null);
  const catalogRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animate('.sensory-card', {
          translateY: [60, 0],
          opacity: [0, 1],
          delay: stagger(100),
          easing: 'easeOutExpo',
          duration: 1200
        });
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (catalogRef.current) observer.observe(catalogRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedSku) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedSku]);

  const skus = [
    {
      id: 1,
      nameES: 'Mazapán de pepita',
      nameEN: 'Pumpkin seed marzipan',
      badgeES: 'Ancestral y Puro',
      badgeEN: 'Ancestral & Pure',
      descES: 'Oro molido de la tierra yucateca. Elaborado con semillas de calabaza tostadas a mano y vainilla ancestral.',
      descEN: 'Ground gold from the Yucatecan land. Made with hand-roasted pumpkin seeds and ancestral vanilla.',
      historyES: 'En los conventos novohispanos, ante la falta de almendras europeas, las monjas decidieron usar la semilla de calabaza nativa. Así nació esta delicia mestiza.',
      historyEN: 'In colonial convents, lacking European almonds, nuns decided to use native pumpkin seeds. Thus, this mestizo delicacy was born.',
      infoES: 'Ver detalle en el empaque.',
      infoEN: 'See details on packaging.',
      featured: true,
      image: import.meta.env.BASE_URL + 'products/mazapan.png',
      color: '#d4b79b'
    },
    {
      id: 2,
      nameES: 'Cocada',
      nameEN: 'Cocada',
      badgeES: 'Cremosa Tradición',
      descES: 'Nieve tropical capturada en dulzor. Coco fresco rallado, cocinado a fuego lento hasta alcanzar el punto exacto de cremosidad.',
      descEN: 'Tropical snow captured in sweetness. Fresh shredded coconut, cooked over low heat to reach the exact point of creaminess.',
      historyES: 'Fruto de la costa, la cocada es el balance perfecto entre la textura del fruto fresco y el azúcar cristalizada.',
      historyEN: 'A fruit of the coast, cocada is the perfect balance between fresh fruit texture and crystallized sugar.',
      image: import.meta.env.BASE_URL + 'products/cocada.png',
      color: '#bd8d54'
    },
    {
      id: 3,
      nameES: 'Palanqueta de pepita',
      nameEN: 'Pumpkin seed brittle',
      badgeES: 'Energía de la Milpa',
      descES: 'Mosaico crujiente de semillas de calabaza seleccionadas, bañadas en miel de abeja yucateca y caramelo artesanal.',
      descEN: 'Crunchy mosaic of selected pumpkin seeds, bathed in Yucatecan bee honey and artisanal caramel.',
      historyES: 'La técnica de aglutinar semillas con miel caliente proviene de tiempos prehispánicos, pensada como fuente de energía.',
      historyEN: 'The technique of binding seeds with hot honey comes from pre-Hispanic times, designed as an energy source.',
      image: import.meta.env.BASE_URL + 'products/palanqueta-pepita.png',
      color: '#bd8d54'
    },
    {
      id: 4,
      nameES: 'Zuncho',
      nameEN: 'Zuncho',
      badgeES: 'Legado Regional',
      descES: 'Golosina regional de textura cristalina y crujiente. Profunda en sabor dorado.',
      descEN: 'Regional treat, of ultra-crunchy texture and deep golden flavor.',
      historyES: 'Un clásico sureño rústico, el zuncho rescata la técnica ancestral de la caramelización.',
      image: import.meta.env.BASE_URL + 'products/zuncho.png',
      color: '#d9a05b'
    },
    {
      id: 5,
      nameES: 'Tamarindo con azúcar',
      nameEN: 'Sugared Tamarind',
      badgeES: 'Ácido y Dulce',
      descES: 'El alma agridulce de México. Pulpa pura de tamarindo recolectada en su punto máximo de madurez.',
      descEN: 'Sweet, tangy, and intensely fruity. A sensory jolt for the palate.',
      historyES: 'El tamarindo encontró su segundo hogar en el trópico mexicano, cubriéndose de azúcar para un viaje inolvidable.',
      image: import.meta.env.BASE_URL + 'products/tamarindo-azucar.png',
      color: '#8c4a32'
    },
    {
      id: 6,
      nameES: 'Tamarindo picante',
      nameEN: 'Spicy Tamarind',
      badgeES: 'Fuego Botánico',
      descES: 'Intensidad picante con mezcla tradicional de chiles. Una explosión sensorial que equilibra el fuego con la acidez.',
      descEN: 'Spicy intensity intertwined with classic sweetness and acidity.',
      historyES: 'Mezclando la audacia del chile con la pulpa del tamarindo tropical, este es el estandarte del paladar mexicano contemporáneo.',
      image: import.meta.env.BASE_URL + 'products/tamarindo-picante.png',
      color: '#a33022'
    },
    {
      id: 7,
      nameES: 'Pasta de guayaba',
      nameEN: 'Guava paste',
      badgeES: 'Perfume Frutal',
      descES: 'Esencia de huerto. Pasta concentrada de guayaba rosa, cocida pacientemente para concentrar su aroma.',
      descEN: 'Fruity note with a soft contrast.',
      historyES: 'Heredero del membrillo español, este dulce adopta el alma de la guayaba mexicana.',
      image: import.meta.env.BASE_URL + 'products/guayaba.png',
      color: '#c45a4b'
    },
    {
      id: 8,
      nameES: 'Palanqueta de amaranto',
      nameEN: 'Amaranth brittle',
      badgeES: 'Grano Sagrado',
      descES: 'Armonía extremadamente ligera y aireada, unida por delicadas notas de miel de la casa.',
      historyES: 'Cereal sagrado renacido en esta pieza dulce y pacífica.',
      image: import.meta.env.BASE_URL + 'products/palanqueta-amaranto.png',
      color: '#e3c081'
    },
    {
      id: 9,
      nameES: 'Palanqueta de coco',
      nameEN: 'Coconut brittle',
      badgeES: 'Brisas Doradas',
      descES: 'Dulce de coco tostado al sol. Una textura única que combina la fibra natural con el crujir del caramelo.',
      historyES: 'Miel y coco en una fusión que abraza la tradición local del Caribe.',
      image: import.meta.env.BASE_URL + 'products/palanqueta-coco.png',
      color: '#f2ecd8'
    },
    {
      id: 10,
      nameES: 'Palanqueta de cacahuate',
      nameEN: 'Peanut brittle',
      badgeES: 'Clásico Rústico',
      descES: 'El clásico rústico por excelencia. Cacahuates seleccionados y tostados, unidos por una melaza dorada.',
      historyES: 'El cacahuate, nativo de América, se encuentra con el piloncillo en una placa dorada atemporal.',
      image: import.meta.env.BASE_URL + 'products/palanqueta-cacahuate.png',
      color: '#cf9e57'
    }
  ];

  return (
    <section className="premium-catalog-section" id="catalogo">
      <div className="catalog-intro">
        <h2 className="catalog-title">{t('Galería Sensorial', 'Sensory Gallery')}</h2>
        <p className="catalog-subtitle">{t('Cada dulce es una obra maestra botánica. Selecciona una pieza para sumergirte en su historia.', 'Every sweet is a botanical masterpiece. Select a piece to immerse in its story.')}</p>
      </div>

      <div className="sensory-grid" ref={catalogRef}>
        {skus.map((sku) => (
          <div 
            key={sku.id} 
            className={`sensory-card ${sku.featured ? 'featured' : ''}`}
            onClick={() => setSelectedSku(sku)}
          >
            <div 
               className="sensory-visual" 
               style={sku.image ? { backgroundImage: `url(${sku.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#f5f5f5' } : { backgroundColor: sku.color }}
            >
              <div className="sensory-overlay">
                <span>{t('Explorar', 'Explore')}</span>
              </div>
            </div>
            <div className="sensory-info">
              <h3>{t(sku.nameES, sku.nameEN)}</h3>
              {sku.featured && (
                <span className="signature-badge">{t(sku.badgeES, sku.badgeEN || 'Signature')}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedSku && (
        <div className="story-modal-overlay">
          <div className="story-modal-backdrop" onClick={() => setSelectedSku(null)}></div>
          <div className="story-modal-content">
            <button className="close-modal-btn" onClick={() => setSelectedSku(null)}>
              ✕
            </button>
            <div className="story-modal-layout">
              <div 
                className="story-modal-visual" 
                style={selectedSku.image ? { backgroundImage: `url(${selectedSku.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#f0f0f0' } : { backgroundColor: selectedSku.color }}
              >
                {!selectedSku.image && (
                  <div className="visual-placeholder">
                    {t('Visión Macro', 'Macro Vision')}
                  </div>
                )}
              </div>
              <div className="story-modal-text">
                <span className="story-badge">
                  {t(selectedSku.badgeES || 'Herencia Viva', selectedSku.badgeEN || 'Living Heritage')}
                </span>
                <h2>{t(selectedSku.nameES, selectedSku.nameEN)}</h2>
                
                <div className="tasting-notes">
                  <h4>{t('Notas de Cata', 'Tasting Notes')}</h4>
                  <p>{t(selectedSku.descES, selectedSku.descEN)}</p>
                </div>

                <div className="history-note">
                  <h4>{t('Nuestra Historia', 'Our History')}</h4>
                  <blockquote>"{t(selectedSku.historyES, selectedSku.historyEN)}"</blockquote>
                </div>
                
                <div className="tech-specs">
                   <span>{t(selectedSku.infoES, selectedSku.infoEN)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Catalog;
