import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import MainLayout from './layouts/MainLayout';
import CartDrawer from './components/CartDrawer/CartDrawer';
import SplashLoader from './components/SplashLoader/SplashLoader';

// Pages
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import History from './pages/History/History';
import B2B from './pages/B2B/B2B';
import FAQ from './pages/FAQ/FAQ';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <CartProvider>
          {showSplash && <SplashLoader onComplete={() => setShowSplash(false)} />}
          <div style={{ opacity: showSplash ? 0 : 1, transition: 'opacity 1s ease' }}>
            <Router>
              <CartDrawer />
              <Routes>
                <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="historia" element={<History />} />
                <Route path="b2b" element={<B2B />} />
                <Route path="faq" element={<FAQ />} />
              </Route>
            </Routes>
          </Router>
        </div>
      </CartProvider>
    </CurrencyProvider>
  </LanguageProvider>
  );
}

export default App;
