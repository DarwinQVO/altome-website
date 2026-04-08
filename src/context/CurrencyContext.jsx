import { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('MXN'); // 'MXN' or 'USD'
  const [exchangeRate, setExchangeRate] = useState(17.5); // Fixed rate for presentation

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'MXN' ? 'USD' : 'MXN');
  };

  const formatPrice = (priceInMXN) => {
    if (currency === 'USD') {
      const usdPrice = (priceInMXN / exchangeRate).toFixed(2);
      return `$${usdPrice} USD`;
    }
    return `$${priceInMXN} MXN`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, formatPrice, exchangeRate }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
