import React, { useState, useContext } from "react";
import { ShopContext } from "../../provider";

const Card = ({ product }) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const { addItem, inCart } = useContext(ShopContext);

  const { name, price } = product;

  const isBought = inCart(product);

  const toggleCartClick = () => {
    addItem(product);
  };

  const toggleHeartClick = () => setHeartClicked(!heartClicked);

  return (
    <div className="col-md-4 mb-3">
      <div className="card bg-light shadow">
        <p
          onClick={toggleHeartClick}
          style={{
            fontSize: "36px",
            color: `${heartClicked ? "orange" : ""}`,
          }}
          className="ml-auto btn mb-0 p-0 mr-2"
        >
          &#9825;
        </p>
        <h4 className="text-center">Image</h4>
        <div className="card-body">
          <h5>{name}</h5>
          <p className="text-muted">Quantity: 1KG</p>
          <div className="d-flex justify-content-between">
            <h5>${price}</h5>
            <button
              type="button"
              onClick={toggleCartClick}
              className="btn rounded-circle"
              style={{ backgroundColor: "coral" }}
              title={`${isBought ? "Discard" : "Add To Cart"}`}
            >
              <span>
                <i
                  className={`${
                    isBought ? "fa-check" : "fa-shopping-cart"
                  } fa text-white`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
