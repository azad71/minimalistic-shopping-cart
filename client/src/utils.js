export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    cartItems = cartItems.filter((item) => item.id !== cartItemToAdd.id);
    return cartItems;
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const getTotal = (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,
    0
  );

export const filterProduct = (cartItems, item) => {
  const productFound = cartItems.find((cartItem) => cartItem.id === item.id);
  if (productFound) return true;

  return false;
};

export const plusQuantity = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

export const minusQuantity = (cartItems, item) => {
  return cartItems.map((cartItem) =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );
};
