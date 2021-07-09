const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Category.find()
    .then((categoryList) => {
      res.status(200).send(categoryList);
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
});

router.get("/:id", (req, res) => {
  Category.findById(req.params.id)
    .then((category) => {
      res.status(200).send(category);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "the category with the given ID was not found" });
    });
});

router.post("/", (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category
    .save()
    .then(() => {
      res.send(category);
    })
    .catch(() => {
      return res.status(404).send("the category cannot be created.");
    });
});

router.put("/:id", (req, res) => {
  Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  )
    .then((category) => {
      res.send(category);
    })
    .catch(() => {
      return res.status(400).send("the category cannot be created");
    });
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "the category has been deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the category could not be found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
