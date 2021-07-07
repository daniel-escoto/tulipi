const { Category } = require("../models/category");
const express = require("express");
const router = express.Router();

router.get(`/`, (req, res) => {
  Category.find()
    .then((categoryList) => {
      res.send(categoryList);
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
});

module.exports = router;
