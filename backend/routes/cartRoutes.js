const express = require("express");
const auth = require("../middleware/authMiddleWare");
const controller = require("../controllers/cartController");

const router = express.Router();

router.get("/", auth, controller.getCart);
router.post("/", auth, controller.addToCart);
router.put("/", auth, controller.updateCart);

module.exports = router;
