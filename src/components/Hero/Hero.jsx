import { useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { createTimeline, stagger } from 'animejs';
import heroImg from '../../assets/hero.png';
import './Hero.css';

const Hero = () => {
  const { t } = useLanguage();
  const heroRef = useRef(null);

  useEffect(() => {
    // Elegant Entrance Animation using Anime.js v4
    const tl = createTimeline({
      easing: 'easeOutQuart',
      duration: 1200
    });

    tl.add({
      targets: '.hero-title',
      translateY: [40, 0],
      opacity: [0, 1],
      delay: 300
    });

    tl.add({
      targets: '.hero-description',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: -800
    });

    tl.add({
      targets: '.hero-actions .btn',
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: stagger(150),
      offset: '-=800'
    });

    tl.add({
      targets: '.hero-image',
      scale: [1.1, 1],
      opacity: [0, 1],
      delay: -1000
    });
  }, []);

  const content = {
    title: t(
      'Dulces tradicionales mexicanos en una caja-regalo premium.', 
      'Traditional Mexican sweets in a premium gift box.'
    ),
    desc1: t(
      'Listos para regalar, viajar y representar el sabor del sureste con elegancia.', 
      'Ready to gift, travel, and represent the flavor of the Southeast with elegance.'
    ),
    btnPrimary: t('Comprar Cajas', 'Buy Boxes'),
    btnSecondary: t('Explorar Colección', 'Explore Collection'),
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">{content.title}</h1>
          <p className="hero-description">
            {content.desc1}
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <a href="#/shop" className="btn btn-primary">{content.btnPrimary}</a>
            <a href="#/historia" className="btn btn-secondary">{content.btnSecondary}</a>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImg} alt="ALTOMÉ - Caja Premium" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
