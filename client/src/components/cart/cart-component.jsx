import React, { useContext, useCallback, useEffect, useState } from "react";
import CartItem from "../cart-item/cart-item.component";
import axios from "axios";

import { ShopContext } from "../../provider";

const Cart = ({ items }) => {
  const { total, cartItems, clearCart } = useContext(ShopContext);
  const [placeOrder, setPlaceOrder] = useState(false);

  useEffect(() => {
    if (placeOrder) {
      clearCart();
      setPlaceOrder(!placeOrder);
      alert("Your order is successfully placed");
    }
  }, [placeOrder, clearCart]);

  const confirmOrder = useCallback(async () => {
    if (placeOrder) return;
    setPlaceOrder(true);
    await axios.post("http://localhost:8000/api/place-order", [
      cartItems,
      total,
    ]);
  }, [placeOrder, cartItems, total]);

  return (
    <>
      {items.length > 0
        ? items.map((item) => <CartItem key={item.id} item={item} />)
        : ""}

      {items.length > 0 ? (
        <div className="d-flex justify-content-between">
          <button
            onClick={confirmOrder}
            style={{ backgroundColor: "coral" }}
            className="btn btn-sm m-3 text-white"
          >
            Place Order
          </button>

          <p className="lead m-3">Total: ${total}</p>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Cart;
