import React, { useContext } from "react";
import { ShopContext } from "../../provider";

const CartItem = ({ item }) => {
  const { name, price, quantity } = item;
  const { addItem, increaseQuantity, decreaseQuantity } = useContext(
    ShopContext
  );

  return (
    <div className="d-flex justify-content-between mt-2">
      <p className="bg-light">Image</p>
      <p>{name}</p>
      <p className="bg-light">
        <span
          onClick={() => increaseQuantity(item)}
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-angle-left pr-1"></i>
        </span>
        {quantity}
        <span
          onClick={() => decreaseQuantity(item)}
          style={{ cursor: "pointer" }}
        >
          <i className="fa fa-angle-right pl-1"></i>
        </span>
      </p>
      <p>${price}</p>
      <p
        onClick={() => addItem(item)}
        className="text-danger"
        style={{ cursor: "pointer" }}
      >
        x
      </p>
    </div>
  );
};

export default CartItem;
