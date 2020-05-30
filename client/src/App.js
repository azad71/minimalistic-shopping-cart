import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import Card from "./components/card/card.component";
import Cart from "./components/cart/cart-component";

import { ShopContext } from "./provider";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const foundProducts = await axios.get(
        "http://localhost:8000/api/products"
      );
      setProducts(foundProducts.data);
    };

    fetchProducts();
  }, []);

  const { cartItems, clearCart } = useContext(ShopContext);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-9">
          <h4>Your Product</h4>
          <div className="row">
            {products
              ? products.map((product) => (
                  <Card key={product.id} product={product} />
                ))
              : ""}
          </div>
        </div>

        <div className="col-md-3 shadow h-100 sticky-top">
          <div
            className="d-flex justify-content-between"
            style={{ borderBottom: "1px solid lightgray" }}
          >
            <h4>Your Cart</h4>

            <button type="button" onClick={clearCart} className="btn">
              <span>
                <i className="fa fa-trash"></i>
              </span>{" "}
              Clear
            </button>
          </div>

          <Cart items={cartItems} />
        </div>
      </div>
    </div>
  );
};

export default App;
