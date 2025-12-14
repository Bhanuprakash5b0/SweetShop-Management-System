const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post(
  "/register",
  [
    body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  register
);

router.post(
  "/login",
  [
    body("name").exists().withMessage("Name is required"),
    body("password").exists().withMessage("Password is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  login
);

module.exports = router;
