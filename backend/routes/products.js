const { Product } = require("../models/product");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  Product.find()
    .then((productList) => {
      res.status(200).send(productList);
    })
    .catch((err) => {
      res.status(500).json({ success: false });
    });
});

router.get("/:id", (req, res) => {
  Product.findById(req.params.id).then((foundProduct) => {
    if (foundProduct) {
      res.status(200).send(foundProduct);
    } else {
      res.status(500).json({ success: false });
    }
  });
});

router.post("/", (req, res) => {
  let category;
  Category.findById(req.body.category).then((foundCategory) => {
    if (foundCategory) {
      category = foundCategory;
    } else {
      return res.status(400).send("Invalid Category");
    }
  });

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product
    .save()
    .then(() => {
      res.send(product);
    })
    .catch((err) => {
      return res.status(404).send("the product cannot be created.");
    });
});

router.put("/:id", (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }
  let category;
  Category.findById(req.body.category).then((foundCategory) => {
    if (foundCategory) {
      category = foundCategory;
    } else {
      return res.status(400).send("Invalid Category");
    }
  });

  Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  ).then((foundProduct) => {
    if (foundProduct) {
      res.send(foundProduct);
    } else {
      return res.status(500).send("the product cannot be updated!");
    }
  });
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product has been deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the product could not be found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.get("/get/count", (req, res) => {
  Product.countDocuments().then((productCount) => {
    if (productCount) {
      res.send({
        productCount: productCount,
      });
    } else {
      res.status(500).json({ success: false });
    }
  });
});
module.exports = router;
