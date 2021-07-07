const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get(`/`, (req, res) => {
  User.find()
    .then((userList) => {
      res.send(userList);
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
});

module.exports = router;
