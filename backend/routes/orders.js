const express = require("express");
const { Order } = require("../models/order");
const { OrderItem } = require("../models/orderItem");
const router = express.Router();

router.get("/", (req, res) => {
  Order.find()
    .populate("user", "name")
    .sort({ dateOrdered: -1 })
    .then((orderList) => {
      res.send(orderList);
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
});

router.get("/:id", (req, res) => {
  Order.findById(req.params.id)
    .populate("user", "name")
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 })
    .then((order) => {
      res.send(order);
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
});

router.post("/", async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quantity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();

      return newOrderItem._id;
    })
  );

  const orderItemsIdsResolved = await orderItemsIds;

  const totalPrices = await Promise.all(
    orderItemsIdsResolved.map(async (orderItemId) => {
      const orderItem = await OrderItem.findById(orderItemId).populate(
        "product",
        "price"
      );
      const totalPrice = orderItem.product.price * orderItem.quantity;
      return totalPrice;
    })
  );

  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

  let order = new Order({
    orderItems: orderItemsIdsResolved,
    shippingAddress1: req.body.shippingAddress1,
    shippingAddress2: req.body.shippingAddress2,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: totalPrice,
    user: req.body.user,
  });

  order = await order.save();

  if (!order) {
    return res.status(404).send("the order cannot be created.");
  }

  res.send(order);
});

router.put("/:id", (req, res) => {
  Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  )
    .then((order) => {
      res.send(order);
    })
    .catch(() => {
      return res.status(400).send("the order cannot be created");
    });
});

// delete all order items
router.delete("/:id", (req, res) => {
  // delete all order items

  Order.findByIdAndRemove(req.params.id)
    .then((order) => {
      if (order) {
        order["orderItems"].map((orderItem) => {
          console.log(orderItem);
          OrderItem.findByIdAndRemove(orderItem)
            .then((order) => {
              console.log(`${orderItem} has been deleted`);
            })
            .catch(() => {
              console.log("an error has occured");
            });
        });
        return res
          .status(200)
          .json({ success: true, message: "the order has been deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the order could not be found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.get("/get/totalsales", async (req, res) => {
  const totalSales = await Order.aggregate([
    { $group: { _id: null, totalSales: { $sum: "$totalPrice" } } },
  ]);

  if (!totalSales) {
    return res.status(400).send("The order sales cannot be generated");
  }

  res.send({ totalsales: totalSales.pop().totalSales });
});

router.get("/get/count", (req, res) => {
  Order.countDocuments().then((orderCount) => {
    if (orderCount) {
      res.send({
        orderCount: orderCount,
      });
    } else {
      res.status(500).json({ success: false });
    }
  });
});

router.get("/get/userorders/:userid", (req, res) => {
  Order.find({ user: req.params.userid })
    .populate({
      path: "orderItems",
      populate: { path: "product", populate: "category" },
    })
    .sort({ dateOrdered: -1 })
    .then((userOrderList) => {
      res.send(userOrderList);
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
});

module.exports = router;
