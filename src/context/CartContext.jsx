import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    // product schema: { id, type: 'pick-n-mix' | 'precurated', name, details (string or array), price (number), quantity }
    
    setCartItems(prev => {
      // Very simple logic: just push new item (or group by same configuration later if needed)
      return [...prev, { ...product, uniqueId: Date.now() }];
    });
    
    setIsCartOpen(true); // Auto open cart when adding
  };

  const removeFromCart = (uniqueId) => {
    setCartItems(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      isCartOpen,
      setIsCartOpen,
      cartTotal,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
