const { User } = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .select("-passwordHash")
    .then((userList) => {
      res.send(userList);
    })
    .catch(() => {
      res.status(500).json({ success: false });
    });
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .select("-passwordHash")
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "the user with the given ID was not found" });
    });
});

router.get("/get/count", (req, res) => {
  User.countDocuments().then((userCount) => {
    if (userCount) {
      res.send({
        userCount: userCount,
      });
    } else {
      res.status(500).json({ success: false });
    }
  });
});

router.post("/", (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
  });

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((err) => {
      return res.status(404).send(err);
    });
});

router.post("/login", (req, res) => {
  const secret = process.env.SECRET;
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(400).send("The user cannot be found");
    }
    if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
      const token = jwt.sign(
        {
          userId: user.id,
          isAdmin: user.isAdmin,
        },
        secret,
        { expiresIn: "1d" }
      );
      return res.status(200).send({ user: user.email, token: token });
    } else {
      return res.status(400).send("Password is wrong");
    }
  });
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "the user has been deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "the user could not be found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
