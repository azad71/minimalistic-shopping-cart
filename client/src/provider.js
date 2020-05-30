import React, { createContext, useState, useEffect } from "react";

import {
  addItemToCart,
  getTotal,
  filterProduct,
  plusQuantity,
  minusQuantity,
} from "./utils";

export const ShopContext = createContext({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  clearCart: () => {},
  inCart: () => {},
  total: 0,
});

const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => setCartItems(addItemToCart(cartItems, item));

  const increaseQuantity = (item) =>
    setCartItems(plusQuantity(cartItems, item));

  const decreaseQuantity = (item) =>
    setCartItems(minusQuantity(cartItems, item));

  const clearCart = () => {
    setCartItems([]);
  };

  const inCart = (item) => filterProduct(cartItems, item);

  useEffect(() => {
    setTotal(getTotal(cartItems));
  }, [cartItems]);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        addItem,
        clearCart,
        inCart,
        increaseQuantity,
        decreaseQuantity,
        total,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopProvider;
