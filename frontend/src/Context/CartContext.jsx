import { createContext, useContext, React, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setcartItem] = useState([]);
  const addToCart = (item) => {
    setcartItem((prevCartItem) => [...prevCartItem, item]);
    console.log("cart item added", cartItem);
  };

  console.log("cart item", cartItem);
  return (
    <CartContext.Provider value={{ cartItem, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
