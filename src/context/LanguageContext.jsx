import { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es'); // 'es' or 'en'

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  };

  const setLanguage = (newLang) => {
    if (newLang === 'es' || newLang === 'en') {
      setLang(newLang);
    }
  };

  // Helper to resolve translation string
  const t = (esString, enString) => {
    return lang === 'es' ? esString : enString;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
