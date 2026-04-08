import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import BoxBuilder from '../../components/BoxBuilder/BoxBuilder';
import Catalog from '../../components/Catalog/Catalog';
import { useCurrency } from '../../context/CurrencyContext';
import { animate, stagger } from 'animejs';
import './Shop.css';

const PRECURATED_MIXES = {
  size6: [
    { id: 'mix6-clasico', nameES: 'Clásico ALTOMÉ', nameEN: 'ALTOMÉ Classic', size: 6, descES: 'La selección definitiva de nuestros favoritos artesanales. Un recorrido por la textura y el alma de la Península.', price: 189, conceptES: 'Nuestra Firma', image: import.meta.env.BASE_URL + 'products/mix-clasico.png', notesES: '1x Mazapán de pepita, 1x Palanqueta de pepita, 1x Cocada, 1x Zuncho, 1x Tamarindo con azúcar, 1x Pasta de guayaba' },
    { id: 'mix6-picante', nameES: 'Dulce Picante ALTOMÉ', nameEN: 'ALTOMÉ Sweet & Spicy', size: 6, descES: 'El contraste magistral entre el dulzor frutal y el fuego del chile. Una experiencia vibrante para paladares aventureros.', price: 189, conceptES: 'Explosión Sensorial', image: import.meta.env.BASE_URL + 'products/dulce-picante.png', notesES: '1x Mazapán de pepita, 1x Palanqueta de pepita, 1x Tamarindo picante, 1x Tamarindo con azúcar, 1x Cocada, 1x Zuncho' },
    { id: 'mix6-tradicion', nameES: 'Tradición ALTOMÉ', nameEN: 'ALTOMÉ Tradition', size: 6, descES: 'Un homenaje a la confitería típica del sureste. El regalo perfecto para llevar un pedazo de México en la maleta.', price: 189, conceptES: 'Orgullo Nacional', image: import.meta.env.BASE_URL + 'products/tradicion.png', notesES: '1x Mazapán de pepita, 1x Palanqueta de pepita, 1x Zuncho, 1x Pasta de guayaba, 1x Palanqueta de amaranto con miel, 1x Palanqueta de coco' },
  ],
  size12: [
    { id: 'mix12-signature', nameES: 'Signature ALTOMÉ', nameEN: 'ALTOMÉ Signature', size: 12, descES: 'La colección definitiva. Doce piezas maestras que narran la historia de nuestra tierra en cada bocado.', price: 359, conceptES: 'Gran Reserva', image: import.meta.env.BASE_URL + 'products/gran-reserva.png', notesES: '2x Mazapanes de pepita, 2x Palanquetas de pepita, 2x Cocadas, 2x Zunchos, 2x Tamarindos con azúcar, 2x Pastas de guayaba' },
    { id: 'mix12-picante', nameES: 'Dulce Picante ALTOMÉ', nameEN: 'ALTOMÉ Sweet & Spicy', size: 12, descES: 'Intensidad botánica multiplicada. El fuego del chile de árbol en armonía con el azúcar de caña.', price: 359, conceptES: 'Explosión Sensorial', image: import.meta.env.BASE_URL + 'products/dulce-picante.png', notesES: '2x Mazapanes de pepita, 2x Palanquetas de pepita, 2x Tamarindos picantes, 2x Tamarindos con azúcar, 2x Cocadas, 2x Zunchos' },
    { id: 'mix12-sureste', nameES: 'Tradición ALTOMÉ', nameEN: 'ALTOMÉ Tradition', size: 12, descES: 'Un recorrido expansivo por los huertos y selvas del sureste. Ideal para compartir el legado vivo.', price: 359, conceptES: 'Ruta del Sabor', image: import.meta.env.BASE_URL + 'products/tradicion.png', notesES: '2x Mazapanes de pepita, 2x Palanquetas de pepita, 2x Zunchos, 2x Pastas de guayaba, 2x Palanquetas de amaranto con miel, 2x Palanquetas de coco' },
  ]
};

const Shop = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [activeTab, setActiveTab] = useState('precurated'); 
  const [selectedMix, setSelectedMix] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'precurated') {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          animate('.mix-card', {
            translateY: [60, 0],
            opacity: [0, 1],
            delay: stagger(150),
            easing: 'easeOutExpo',
            duration: 1200
          });
          observer.disconnect();
        }
      }, { threshold: 0.1 });

      if (gridRef.current) observer.observe(gridRef.current);
      return () => observer.disconnect();
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedMix) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedMix]);

  const viewMix = (mix) => {
    setSelectedMix(mix);
  };

  const closeMix = () => {
    setSelectedMix(null);
  };

  const handleAddToCart = () => {
    addToCart({
      id: selectedMix.id,
      type: 'precurated',
      name: t(selectedMix.nameES, selectedMix.nameEN),
      details: selectedMix.notesES.split(', ').map(n => n.trim()),
      price: selectedMix.price,
      quantity: 1
    });
    closeMix();
  };

  return (
    <div className="shop-page">
      <section className="shop-header">
        <h1>{t('Tienda ALTOMÉ', 'ALTOMÉ Shop')}</h1>
        <p>{t('Lleva contigo la auténtica confitería mexicana. No vendemos por pieza, vendemos experiencias.', 'Take authentic Mexican confectionery with you. We don\'t sell pieces, we sell experiences.')}</p>
        
        <div className="shop-tabs">
          <button className={`shop-tab ${activeTab === 'precurated' ? 'active' : ''}`} onClick={() => setActiveTab('precurated')}>
            {t('Mixes Prearmados', 'Pre-curated Mixes')}
          </button>
          <button className={`shop-tab ${activeTab === 'pick-mix' ? 'active' : ''}`} onClick={() => setActiveTab('pick-mix')}>
            {t('Pick & Mix (Arma tu caja)', 'Pick & Mix (Build your box)')}
          </button>
          <button className={`shop-tab ${activeTab === 'catalog' ? 'active' : ''}`} onClick={() => setActiveTab('catalog')}>
            {t('Conoce el catálogo', 'Explore flavors')}
          </button>
        </div>
      </section>
      
      {activeTab === 'precurated' && (
        <div className="precurated-section" ref={gridRef}>
          <h2>{t('Cajas de 6 Piezas', '6-Piece Boxes')}</h2>
          <div className="mixes-grid">
            {PRECURATED_MIXES.size6.map((mix) => (
              <div className="mix-card" key={mix.id} onClick={() => viewMix(mix)}>
                <div className="mix-card-image" style={mix.image ? { backgroundImage: `url(${mix.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}></div>
                <div className="mix-card-info">
                  <h3>{t(mix.nameES, mix.nameEN)}</h3>
                  <p>{t(mix.descES, mix.descEN)}</p>
                  <span className="mix-price">{formatPrice(mix.price)}</span>
                </div>
                <div className="mix-card-overlay">
                  <span>{t('Explorar Mix', 'Explore Mix')}</span>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '4rem' }}>{t('Cajas de 12 Piezas', '12-Piece Boxes')}</h2>
          <div className="mixes-grid">
            {PRECURATED_MIXES.size12.map((mix) => (
              <div className="mix-card" key={mix.id} onClick={() => viewMix(mix)}>
                <div className="mix-card-image size-12-img" style={mix.image ? { backgroundImage: `url(${mix.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}></div>
                <div className="mix-card-info">
                  <h3>{t(mix.nameES, mix.nameEN)}</h3>
                  <p>{t(mix.descES, mix.descEN)}</p>
                  <span className="mix-price">{formatPrice(mix.price)}</span>
                </div>
                <div className="mix-card-overlay">
                  <span>{t('Explorar Mix', 'Explore Mix')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'pick-mix' && (
        <div className="pick-mix-section">
          <BoxBuilder />
        </div>
      )}

      {activeTab === 'catalog' && (
        <div className="catalog-info-section">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span style={{ background: '#f0f0f0', color: '#666', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
              {t('Catálogo Informativo (Venta exclusiva en caja)', 'Informative Catalog (Sold exclusively in boxes)')}
            </span>
          </div>
          <Catalog />
        </div>
      )}

      {/* LUXURY MIX PURCHASE MODAL */}
      {selectedMix && (
        <div className="mix-modal-overlay">
          <div className="mix-modal-backdrop" onClick={closeMix}></div>
          <div className="mix-modal-content">
            <button className="close-modal-btn" onClick={closeMix}>✕</button>
            <div className="mix-modal-layout">
              <div 
                className="mix-modal-visual" 
                style={selectedMix.image ? { backgroundImage: `url(${selectedMix.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                {!selectedMix.image && (
                  <div className="visual-placeholder">
                    CAJA DE {selectedMix.size}
                  </div>
                )}
              </div>
              <div className="mix-modal-text">
                <span className="story-badge">{t(selectedMix.conceptES, selectedMix.conceptES)}</span>
                <h2>{t(selectedMix.nameES, selectedMix.nameEN)}</h2>
                
                <div className="tasting-notes">
                  <h4>{t('El Concepto', 'The Concept')}</h4>
                  <p>{t(selectedMix.descES, selectedMix.descES)}</p>
                </div>

                <div className="mix-contents">
                   <h4>{t('Contiene', 'Contains')}</h4>
                   <p>{selectedMix.notesES}</p>
                </div>

                <div className="mix-purchase-area">
                  <span className="mix-big-price">{formatPrice(selectedMix.price)}</span>
                  <button className="btn btn-primary btn-large-buy" onClick={() => handleAddToCart()}>
                    {t('Añadir al Carrito', 'Add to Cart')}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;
