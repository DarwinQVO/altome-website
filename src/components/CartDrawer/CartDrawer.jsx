import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCurrency } from '../../context/CurrencyContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, cartTotal } = useCart();
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();

  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  
  const [shippingMethod, setShippingMethod] = useState('cancun'); // cancun | shipping
  const [errorMsg, setErrorMsg] = useState(null);

  const [shippingZip, setShippingZip] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingProvider, setShippingProvider] = useState('');
  const [shippingIsLoading, setShippingIsLoading] = useState(false);

  React.useEffect(() => {
    if (shippingMethod === 'cancun') {
      setShippingCost(0);
      setShippingProvider('');
    }
  }, [shippingMethod]);

  const grandTotal = cartTotal + shippingCost;

  const calculateDynamicShipping = async () => {
    setErrorMsg(null);
    if (!shippingZip.trim()) {
      setErrorMsg(t('Por favor introduce tu código postal para cotizar.', 'Please enter your zip code.'));
      return;
    }
    setShippingIsLoading(true);
    try {
      const response = await fetch('/api/quote_shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ zipcode: shippingZip })
      });
      const data = await response.json();
      if (data.price !== undefined) {
        setShippingCost(data.price);
        setShippingProvider(data.provider);
      } else {
        throw new Error('Error en el pipeline logístico.');
      }
    } catch (error) {
      console.error(error);
      setShippingCost(200); 
      setShippingProvider('Tarifa Fija Nacional (Plazo Extendido)');
    }
    setShippingIsLoading(false);
  };

  // WhatsApp checkout removed to professionalize the e-commerce experience

  const handleMercadoPagoCheckout = async () => {
    setErrorMsg(null);
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setErrorMsg(t('Por favor introduce tu información completa de contacto y envío.', 'Please enter your full contact and shipping details.'));
      return;
    }
    if (shippingMethod === 'shipping' && shippingCost === 0) {
      setErrorMsg(t('Por favor calcula el costo de tu envío postal antes de continuar.', 'Please calculate your shipping rate before continuing.'));
      return;
    }

    try {
      // Pointing to our industrial backend (dynamic for production deployment)
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${API_BASE_URL}/api/create_preference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cartItems, 
          shippingFee: shippingCost,
          payer: {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            address: customerAddress,
            zipcode: shippingZip
          }
        })
      });
      
      const data = await response.json();
      if (data.init_point) {
        window.location.href = data.init_point; 
      } else {
        throw new Error('No se pudo generar el enlace de pago.');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(t('Servidor de pagos en mantenimiento. Por favor reintenta en un momento.', 'Payment server in maintenance. Please retry in a moment.'));
    }
  };

  const closeDrawer = () => {
    setIsCheckoutMode(false);
    setIsCartOpen(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay">
      <div className="cart-drawer-backdrop" onClick={closeDrawer}></div>
      <div className="cart-drawer-content">
        <div className="cart-header">
          <h2>{isCheckoutMode ? t('Confirmación', 'Checkout') : t('Caja Registradora', 'Your Register')}</h2>
          <button className="cart-close-btn" onClick={closeDrawer}>✕</button>
        </div>

        {!isCheckoutMode ? (
          <>
            <div className="cart-items-container">
              {cartItems.length === 0 ? (
                <div className="cart-empty-state">
                  <p>{t('Tu selección está vacía.', 'Your selection is empty.')}</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.uniqueId} className="cart-item">
                    <div className="cart-item-info">
                      <div className="cart-item-header">
                        <h4>{item.name}</h4>
                        <span className="cart-badge">{item.type === 'precurated' ? t('Mix Pre-armado', 'Curated Mix') : t('Arma tu caja', 'Custom Box')}</span>
                      </div>
                      <div className="cart-item-desc">
                        {Array.isArray(item.details) ? (
                           <ul style={{ paddingLeft: '1rem', margin: '0.5rem 0', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                             {item.details.map((d, i) => <li key={i}>{d}</li>)}
                           </ul>
                        ) : (
                           <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: '0.5rem 0' }}>{item.details}</p>
                        )}
                      </div>
                      <div className="cart-item-footer">
                        <span className="cart-qty">Qty: {item.quantity}</span>
                        <span className="cart-price">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                    <button className="cart-remove-btn" onClick={() => removeFromCart(item.uniqueId)}>
                      {t('Quitar', 'Remove')}
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <span>{t('Subtotal', 'Subtotal')}</span>
                <span className="cart-total-price">{formatPrice(cartTotal)}</span>
              </div>
              <button 
                className={`btn btn-primary cart-checkout-btn ${cartItems.length === 0 ? 'disabled' : ''}`}
                disabled={cartItems.length === 0}
                onClick={() => setIsCheckoutMode(true)}
              >
                {t('Comenzar Checkout', 'Begin Checkout')}
              </button>
            </div>
          </>
        ) : (
          <div className="cart-checkout-flow">
            <div className="checkout-form">
              <div className="checkout-field" style={{ animationDelay: '0.0s' }}>
                <label>{t('Nombre Completo', 'Full Name')}</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Ej. Ana García" />
              </div>

              <div className="checkout-field" style={{ animationDelay: '0.1s' }}>
                <label>{t('Correo Electrónico', 'Email Address')}</label>
                <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="contacto@ejemplo.com" />
              </div>

              <div className="checkout-field" style={{ animationDelay: '0.2s' }}>
                <label>{t('Teléfono / WhatsApp', 'Phone Number')}</label>
                <input type="tel" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="10 dígitos" />
              </div>

              <div className="checkout-field" style={{ animationDelay: '0.3s' }}>
                <label>{t('Destino de Entrega', 'Delivery Destination')}</label>
                <select value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)}>
                  <option value="cancun">{t('Cancún (Delivery Local) - Gratis', 'Cancun (Local Delivery) - Free')}</option>
                  <option value="shipping">{t('Tarifador Dinámico Postal (Federación y Global)', 'Dynamic Postal Rates (National & Global)')}</option>
                </select>
              </div>

              {shippingMethod === 'shipping' && (
                <div className="checkout-field" style={{ animation: 'fadeInCart 0.3s ease' }}>
                  <label>{t('Código Postal de Destino', 'Destination Zipcode')}</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      value={shippingZip} 
                      onChange={(e) => setShippingZip(e.target.value)}
                      placeholder="Ej. 11000 / 94105"
                      style={{ flex: 1 }}
                    />
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '0.75rem 1rem', width: 'auto' }}
                      onClick={calculateDynamicShipping}
                      disabled={shippingIsLoading}
                    >
                      {shippingIsLoading ? t('Calculando...', 'Bidding...') : t('Cotizar', 'Quote')}
                    </button>
                  </div>
                  {shippingProvider && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{ color: 'var(--color-emerald-deep)' }}>✓</span> 
                      {t('Trazado vía:', 'Routed via:')} <strong>{shippingProvider}</strong>
                    </span>
                  )}
                </div>
              )}

              <div className="checkout-field" style={{ animationDelay: '0.4s' }}>
                <label>{t('Dirección de Envío Completa', 'Full Shipping Address')}</label>
                <textarea 
                  value={customerAddress} 
                  onChange={(e) => setCustomerAddress(e.target.value)} 
                  placeholder={t("Calle, Número exterior/interior, Colonia, Ciudad, Estado, Referencias...", "Street, Number, Neighborhood, City, State, References...")}
                  rows="3"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)', fontFamily: 'inherit', resize: 'vertical' }}
                />
              </div>

            </div>

            <div className="checkout-breakdown">
              <div className="breakdown-row">
                <span>{t('Subtotal', 'Subtotal')}</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="breakdown-row">
                <span>{t('Envío', 'Shipping')}</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="breakdown-row grand-total">
                <span>{t('Total a pagar', 'Total to pay')}</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {errorMsg && (
              <div style={{ color: '#ab4444', backgroundColor: '#fff5f5', border: '1px solid #ffdcdc', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.2rem', fontSize: '0.85rem', textAlign: 'center', fontFamily: 'var(--font-sans)', fontWeight: '500' }}>
                {errorMsg}
              </div>
            )}

            <div className="checkout-actions">
              <button className="btn btn-secondary cart-back-btn" onClick={() => setIsCheckoutMode(false)}>
                {t('Volver al Carrito', 'Back to Cart')}
              </button>
              <button 
                className="btn btn-primary mercado-pago-btn" 
                onClick={handleMercadoPagoCheckout}
              >
                {t('Pagar de Forma Segura (MercadoPago)', 'Pay Securely (MercadoPago)')}
              </button>
            </div>
            <p className="checkout-disclaimer">
              {t('Serás redirigido a la pasarela cifrada de MercadoPago para procesar tu pago 100% seguro.', 'You will be redirected to the encrypted MercadoPago gateway to process your 100% secure payment.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
