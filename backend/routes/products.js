const { Product } = require("../models/product");
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get("/", (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  Product.find(filter)
    .populate("category")
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

router.post("/", uploadOptions.single("image"), (req, res) => {
  let category;
  Category.findById(req.body.category).then((foundCategory) => {
    if (foundCategory) {
      category = foundCategory;
    } else {
      return res.status(400).send("Invalid Category");
    }
  });

  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
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

router.put("/:id", uploadOptions.single("image"), (req, res) => {
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

  let product;
  Product.findById(req.body.id).then((foundProduct) => {
    if (foundProduct) {
      product = foundProduct;
    } else {
      return res.status(400).send("Invalid Product");
    }
  });

  const file = req.file;
  let imagepath;

  if (file) {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    imagepath = `${basePath}${fileName}`;
  } else {
    imagepath = product.image;
  }

  Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagepath,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true }
  ).then((updatedProduct) => {
    if (updatedProduct) {
      res.send(updatedProduct);
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

router.get("/get/featured/:count", (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  Product.find({ isFeatured: true })
    .limit(Number(count))
    .then((featuredProducts) => {
      if (featuredProducts) {
        res.send({
          featuredProducts: featuredProducts,
        });
      } else {
        res.status(500).json({ success: false });
      }
    });
});

router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }

    const files = req.files;
    let imagePaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    if (files) {
      files.map((file) => {
        imagePaths.push(`${basePath}${file.filename}`);
      });
    }

    Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagePaths,
      },
      { new: true }
    ).then((updatedProduct) => {
      if (updatedProduct) {
        res.send(updatedProduct);
      } else {
        return res.status(500).send("the product cannot be updated!");
      }
    });
  }
);

module.exports = router;
