const express = require("express");
const auth = require("../middleware/authMiddleWare");
const role = require("../middleware/roleMiddleWare");
const controller = require("../controllers/itemController");

const router = express.Router();

router.get("/", auth, controller.getItems);
router.post("/", auth, role("ADMIN"), controller.addItem);
router.put("/:id", auth, role("ADMIN"), controller.updateItem);
router.delete("/:id", auth, role("ADMIN"), controller.deleteItem);

module.exports = router;
