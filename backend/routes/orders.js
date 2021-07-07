const { Order } = require("../models/order");
const express = require("express");
const router = express.Router();

router.get(`/`, (req, res) => {
  Order.find()
    .then((orderList) => {
      res.send(orderList);
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
});

module.exports = router;
