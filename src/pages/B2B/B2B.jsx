import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './B2B.css';

const B2B = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    volume: '50',
    details: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('Su solicitud ha sido enviada al Círculo Corporativo. Nuestro equipo le contactará en menos de 24 horas.', 'Your request has been sent to the Corporate Circle. Our team will contact you in less than 24 hours.'));
    setFormData({ name: '', organization: '', email: '', volume: '50', details: '' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.b2b-reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="b2b-page">
      <header className="b2b-hero b2b-reveal">
        <div className="b2b-hero-text">
          <h1>{t('Protocolo de Amenidad', 'Amenity Protocol')}</h1>
          <p>{t('Elevando el umbral de hospitalidad. Diseñado para Hotelería 5 Estrellas, regalos corporativos de élite y congresos magnos.', 'Elevating the threshold of hospitality. Designed for 5-Star Hotels, elite corporate gifting, and grand conventions.')}</p>
        </div>
      </header>

      <section className="b2b-value-props">
        <div className="b2b-prop b2b-reveal">
          <span className="b2b-prop-number">01</span>
          <h3>{t('Memorabilidad', 'Memorability')}</h3>
          <p>{t('Sustituya las clásicas amenidades de bienvenida con un tributo cultural comestible que sus huéspedes fotografiarán y comentarán.', 'Replace traditional welcome amenities with an edible cultural tribute that your guests will photograph and talk about.')}</p>
        </div>
        <div className="b2b-prop b2b-reveal">
          <span className="b2b-prop-number">02</span>
          <h3>{t('Personalización Visual', 'Visual Customization')}</h3>
          <p>{t('Intervención del empaque exterior con cintas fajas y sellos en cera que integran sutilmente el logotipo de su hotel o marca.', 'Intervention of the outer packaging with bands and wax seals subtly integrating the logic of your hotel or brand.')}</p>
        </div>
        <div className="b2b-prop b2b-reveal">
          <span className="b2b-prop-number">03</span>
          <h3>{t('Eficiencia Logística', 'Logistic Efficiency')}</h3>
          <p>{t('Precios escalados por volúmenes y tiempos de entrega blindados para asegurar que sus recepciones nunca carezcan de la amenidad perfecta.', 'Volume-scaled pricing and bulletproof delivery times ensuring your receptions never lack the perfect amenity.')}</p>
        </div>
      </section>

      <section className="b2b-form-section b2b-reveal">
        <div className="form-container">
          <h2>{t('Solicitar Acceso Corporativo', 'Request Corporate Access')}</h2>
          <p>{t('Nuestro equipo gestiona cuentas de alto volumen directamente para garantizar la integridad del empaque impreso.', 'Our team manages high-volume accounts directly to guarantee the integrity of custom printed packaging.')}</p>

          <form onSubmit={handleSubmit} className="b2b-form">
            <div className="form-group">
              <label>{t('Nombre Completo', 'Full Name')}</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="form-group">
              <label>{t('Organización / Hotel', 'Organization / Hotel')}</label>
              <input type="text" name="organization" value={formData.organization} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>{t('Correo Corporativo', 'Corporate Email')}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>{t('Volumen Proyectado', 'Projected Volume')}</label>
              <select name="volume" value={formData.volume} onChange={handleChange}>
                <option value="50">50 - 200 {t('unidades/mes', 'units/month')}</option>
                <option value="200">200 - 500 {t('unidades/mes', 'units/month')}</option>
                <option value="500+">+500 {t('unidades/mes', 'units/month')}</option>
                <option value="one-time">{t('Evento Único (Boda, Congreso)', 'One-time Event')}</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>{t('Detalles del Proyecto', 'Project Details')}</label>
              <textarea name="details" rows="4" value={formData.details} onChange={handleChange} placeholder={t('Cuéntenos sobre su evento u operación...', 'Tell us about your event or operation...')} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary b2b-submit">{t('Enviar Solicitud', 'Submit Inquiry')}</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default B2B;
