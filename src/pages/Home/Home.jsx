import Hero from '../../components/Hero/Hero';
import Philosophy from '../../components/Philosophy/Philosophy';
import BoxBuilder from '../../components/BoxBuilder/BoxBuilder';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import Trust from '../../components/Trust/Trust';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      {/* "Por qué ALTOMÉ" */}
      <Philosophy />

      {/* Arma tu Caja Interactive Experience */}
      <BoxBuilder />

      {/* Mini-Tienda / Curated Selection */}
      <section className="mini-shop">
        <h2>Selección Curada</h2>
        <p>¿Prefieres una caja prearmada con los favoritos de la casa?</p>
        <a href="#/shop" className="btn btn-primary">Ver Cajas Pre-armadas</a>
      </section>

      <HowItWorks />
      <Trust />
    </div>
  );
};

export default Home;
