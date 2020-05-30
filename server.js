// loading dependencies
const express = require("express");
const cors = require("cors");
const { default: ShortUniqueId } = require("short-unique-id");
const fs = require("fs");

// load data sources
const Products = require("./data_sources/Products");

// initializing app and other libraries
const app = express();
const uid = new ShortUniqueId();

// app config
const PORT = process.env.PORT || 8000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// routes

// @route GET /api/products
// @desc Get all products
// @access public
app.get("/api/products", (req, res) => {
  res.json(Products);
});

// @route POST /api/orders
// @desc Save orders to backend
// @access public
app.post("/api/place-order", (req, res) => {
  const orderData = req.body[0];
  const total = req.body[1];

  const orderId = `order__${uid()}`;
  const orders = {};
  orders[orderId] = {};
  orders[orderId]["Total"] = total;

  orderData.map((order) => {
    let productName = order.name;
    delete order.name;
    orders[orderId][productName] = order;
  });

  fs.writeFile(
    `./data_sources/Orders/${orderId}.json`,
    JSON.stringify(orders, null, 2),
    (error) => {
      if (error) console.log(error);
      return res.json({ message: "Order placed successfully" });
    }
  );
});

// spinning up server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
