import './FAQ.css';

const FAQ = () => {
  const faqs = [
    {
      q: '¿Se puede llevar en avión?',
      a: 'Sí, nuestras cajas caben perfectamente en equipaje de mano o documentado.'
    },
    {
      q: '¿Cuánto dura? / ¿Se derrite?',
      a: 'Nuestro empaque y formulación lo protegen en climas cálidos. Se mantienen firmes y estéticos.'
    },
    {
      q: '¿Hay pedidos para empresas?',
      a: 'Absolutamente, ofrecemos amenidades y corporativos. Visita nuestra sección B2B.'
    }
  ];

  return (
    <div className="faq-page" style={{ paddingTop: '100px', maxWidth: '800px', margin: '0 auto', padding: '100px 20px 40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '3rem' }}>Preguntas Frecuentes</h1>
      <div className="faq-list">
        {faqs.map((item, idx) => (
          <div key={idx} className="faq-item" style={{ marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>{item.q}</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
