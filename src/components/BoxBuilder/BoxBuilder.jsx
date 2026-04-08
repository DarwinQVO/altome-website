import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { animate, stagger } from 'animejs';
import './BoxBuilder.css';

const SWEETS = [
  { id: 'mazapan', nameES: 'Mazapán de pepita', nameEN: 'Pumpkin seed marzipan', color: '#d4b79b', image: import.meta.env.BASE_URL + 'products/mazapan.png', isMandatory: true, desc: 'Oro molido. Semillas de calabaza tostadas a mano y vainilla ancestral.', conceptES: 'Ancestral y Puro' },
  { id: 'cocada', nameES: 'Cocada', nameEN: 'Cocada', color: '#e8dcce', image: import.meta.env.BASE_URL + 'products/cocada.png', desc: 'Nieve tropical. Coco fresco rallado y cocinado a fuego lento.', conceptES: 'Cremosa Tradición' },
  { id: 'palanqueta-pepita', nameES: 'Palanqueta de pepita', nameEN: 'Pumpkin seed brittle', color: '#bd8d54', image: import.meta.env.BASE_URL + 'products/palanqueta-pepita.png', desc: 'Mosaico crujiente de semillas bañadas en miel de abeja yucateca.', conceptES: 'Energía de la Milpa' },
  { id: 'zuncho', nameES: 'Zuncho', nameEN: 'Zuncho', color: '#d9a05b', image: import.meta.env.BASE_URL + 'products/zuncho.png', desc: 'Golosina regional de textura cristalina y crujiente.', conceptES: 'Legado Regional' },
  { id: 'tamarindo-azucar', nameES: 'Tamarindo con azúcar', nameEN: 'Sugared Tamarind', color: '#8c4a32', image: import.meta.env.BASE_URL + 'products/tamarindo-azucar.png', desc: 'El alma agridulce de México. Pulpa pura y cristales de azúcar.', conceptES: 'Ácido y Dulce' },
  { id: 'tamarindo-picante', nameES: 'Tamarindo picante', nameEN: 'Spicy Tamarind', color: '#a33022', image: import.meta.env.BASE_URL + 'products/tamarindo-picante.png', desc: 'Fuego botánico. Mezcla tradicional de chiles y pulpa madura.', conceptES: 'Intensidad Picante' },
  { id: 'guayaba', nameES: 'Pasta de guayaba', nameEN: 'Guava paste', color: '#c45a4b', image: import.meta.env.BASE_URL + 'products/guayaba.png', desc: 'Esencia de huerto. Pasta concentrada de guayaba rosa.', conceptES: 'Perfume Frutal' },
  { id: 'palanqueta-amaranto', nameES: 'Palanqueta de amaranto c/ miel', nameEN: 'Amaranth honey brittle', color: '#e3c081', image: import.meta.env.BASE_URL + 'products/palanqueta-amaranto.png', desc: 'Armonía ligera. Grano sagrado fusionado con miel de la casa.', conceptES: 'Grano Sagrado' },
  { id: 'palanqueta-coco', nameES: 'Palanqueta de coco', nameEN: 'Coconut brittle', color: '#f2ecd8', image: import.meta.env.BASE_URL + 'products/palanqueta-coco.png', desc: 'Caramelo de coco tostado. El sol del sureste hecho dulce.', conceptES: 'Brisas Doradas' },
  { id: 'palanqueta-cacahuate', nameES: 'Palanqueta de cacahuate', nameEN: 'Peanut brittle', color: '#cf9e57', image: import.meta.env.BASE_URL + 'products/palanqueta-cacahuate.png', desc: 'Clásico rústico. Cacahuates seleccionados en punto de nieve.', conceptES: 'Clásico Rústico' },
];

const BoxBuilder = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [boxSize, setBoxSize] = useState(6);
  const [selected, setSelected] = useState([]);
  const [isSealed, setIsSealed] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    // Staggered entrance for the options grid using v4 animate
    animate('.bb-option-card-premium', {
      translateX: [30, 0],
      opacity: [0, 1],
      delay: stagger(100),
      easing: 'easeOutExpo',
      duration: 1000
    });
  }, []);

  useEffect(() => {
    if (isSealed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSealed]);

  const isFull = selected.length >= boxSize;
  const hasMazapan = selected.some(s => s.id === 'mazapan');
  
  const addSweet = (sweet) => {
    if (!isFull && !isSealed) {
      const newSelected = [...selected, sweet];
      setSelected(newSelected);
      
      // Pulse animation for the newly added slot using v4 animate
      setTimeout(() => {
        animate(`.bb-slot:nth-child(${newSelected.length})`, {
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutElastic(1, .6)'
        });
      }, 0);
    }
  };

  const removeSweet = (index) => {
    if (!isSealed) {
      const newSelected = [...selected];
      newSelected.splice(index, 1);
      setSelected(newSelected);
    }
  };

  const sealBox = () => {
    if (isFull && hasMazapan) {
      setIsSealed(true);
    }
  };

  const resetBox = () => {
    setSelected([]);
    setIsSealed(false);
  };

  const checkoutAndReset = () => {
    addToCart({
      id: `custom-box-${boxSize}-${Date.now()}`,
      type: 'pick-n-mix',
      name: t(`Caja Personalizada ${boxSize} PZ`, `Custom Box ${boxSize} PZ`),
      details: selected.map(s => t(s.nameES, s.nameEN)),
      price: boxSize === 6 ? 210 : 420,
      quantity: 1
    });
    resetBox();
  };

  const slots = Array.from({ length: boxSize }, (_, i) => selected[i] || null);
  const totalPriceVal = boxSize === 6 ? 210 : 420;
  const totalPrice = formatPrice(totalPriceVal);

  return (
    <section className="box-builder-section">
      <div className="bb-container">
        <div className="bb-header">
          <h2>{t('Arma tu caja ALTOMÉ', 'Build your ALTOMÉ box')}</h2>
          <p>{t('Elige tus dulces favoritos y crea una experiencia premium personalizada.', 'Choose your favorite sweets and create a customized premium experience.')}</p>
        </div>

        <div className="bb-size-selector">
           <button className={`btn-size ${boxSize === 6 ? 'active' : ''}`} onClick={() => { setBoxSize(6); setSelected(selected.slice(0,6)); }}>Caja 6</button>
           <button className={`btn-size ${boxSize === 12 ? 'active' : ''}`} onClick={() => setBoxSize(12)}>Caja 12</button>
        </div>

        <div className="bb-layout">
          {/* THE BOX */}
          <div className="bb-box-area">
            <div className={`bb-grid size-${boxSize}`}>
              {slots.map((sweet, idx) => {
                const styleObj = sweet && sweet.image ? {
                  backgroundImage: `url(${sweet.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: 'none' 
                } : { };

                return (
                  <div 
                    key={idx} 
                    className={`bb-slot ${sweet ? 'filled' : 'empty'}`}
                    onClick={() => sweet && removeSweet(idx)}
                    style={styleObj}
                    title={sweet ? t('Clic para quitar', 'Click to remove') : t('Espacio vacío', 'Empty slot')}
                  >
                    {sweet && !sweet.image ? <span className="bb-slot-label">{t(sweet.nameES, sweet.nameEN)}</span> : null}
                  </div>
                );
              })}
            </div>
            
            <div className="bb-status">
              <span className="bb-counter">
                {selected.length} / {boxSize} {t('piezas', 'pieces')}
              </span>
              {!hasMazapan && selected.length > 0 && (
                <span className="bb-warning">{t('* Recuerda incluir al menos 1 Mazapán de pepita.', '* Remember to include at least 1 Pumpkin seed marzipan.')}</span>
              )}
            </div>
          </div>

          {/* THE OPTIONS */}
          <div className="bb-options-area">
            <h3>{t('Selecciona tus piezas', 'Select your pieces')}</h3>
            <div className="bb-options-grid">
              {SWEETS.map((sweet) => {
                const sidebarStyleObj = sweet.image ? {
                  backgroundImage: `url(${sweet.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                } : { backgroundColor: sweet.color };

                return (
                  <div 
                    key={sweet.id} 
                    className={`bb-option-card-premium ${isFull ? 'disabled' : ''}`}
                    onClick={() => addSweet(sweet)}
                  >
                    <div className="bb-option-color" style={sidebarStyleObj}></div>
                    <div className="bb-option-info">
                      <span className="bb-option-name">{t(sweet.nameES, sweet.nameEN)}</span>
                      <span className="bb-option-desc">{sweet.desc}</span>
                      {sweet.isMandatory && <span className="bb-badge">{t('Obligatorio', 'Required')}</span>}
                    </div>
                    <div className="bb-option-add">+</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bb-actions">
           <button 
             className={`btn btn-primary bb-seal-btn ${(!isFull || !hasMazapan) ? 'disabled' : ''}`}
             onClick={sealBox}
             disabled={!isFull || !hasMazapan}
           >
             {isFull ? (hasMazapan ? t('Sellar mi caja', 'Seal my box') : t('Falta Mazapán', 'Missing Marzipan')) : t('Completa tu caja', 'Complete your box')}
           </button>
        </div>

      </div>

      {/* LUXURY CHECKOUT SUCCESS MODAL */}
      {isSealed && (
        <div className="mix-modal-overlay">
          <div className="mix-modal-backdrop" onClick={resetBox}></div>
          <div className="mix-modal-content bb-success-modal">
            <button className="close-modal-btn" onClick={resetBox}>✕</button>
            <div className="mix-modal-layout">
              <div className="mix-modal-visual bb-seal-visual">
                
                <h3 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem'}}>{t('Caja Sellada', 'Box Sealed')}</h3>
                
                <div style={{ width: '80%', margin: '0 auto', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.5))' }}>
                  <div className={`bb-grid size-${boxSize}`} style={{ margin: 0 }}>
                    {slots.map((sweet, idx) => {
                      const styleObjModal = sweet && sweet.image ? {
                        backgroundImage: `url(${sweet.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        boxShadow: 'none',
                        pointerEvents: 'none'
                      } : { pointerEvents: 'none' };

                      return (
                        <div 
                          key={idx} 
                          className={`bb-slot filled`}
                          style={styleObjModal}
                        >
                          {sweet && !sweet.image ? <span className="bb-slot-label">{t(sweet.nameES, sweet.nameEN)}</span> : null}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
              <div className="mix-modal-text">
                <span className="story-badge">{t('Experiencia Personalizada', 'Custom Experience')}</span>
                <h2>{t('Listo Para Regalar', 'Ready For Gifting')}</h2>
                
                <div className="tasting-notes">
                  <h4>{t('Tu Selección', 'Your Selection')}</h4>
                  <p>{t(`Has curado magistralmente ${boxSize} piezas del sureste mexicano.`, `You have masterfully curated ${boxSize} pieces of the Mexican southeast.`)}</p>
                </div>

                <div className="mix-contents" style={{ marginBottom: '2rem' }}>
                   <h4>{t('Contiene', 'Contains')}</h4>
                   <ul style={{ paddingLeft: '1.5rem', color: 'var(--color-text-secondary)', lineHeight: '1.8' }}>
                     {Object.entries(
                       selected.reduce((acc, curr) => {
                         acc[curr.nameES] = (acc[curr.nameES] || 0) + 1;
                         return acc;
                       }, {})
                     ).map(([name, count]) => (
                       <li key={name}>{count}x {name}</li>
                     ))}
                   </ul>
                </div>

                <div className="mix-purchase-area">
                  <span className="mix-big-price">{totalPrice}</span>
                  <button className="btn btn-primary btn-large-buy" onClick={checkoutAndReset}>
                    {t('Añadir al Carrito', 'Add to Cart')}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default BoxBuilder;
