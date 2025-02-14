const express = require("express");
const router = express.Router();
const {createOrder,getOrderHistory} = require("../controller/order_controller");

router.post("/createOrder", createOrder);
router.get("/getOrderHistory/:userId", getOrderHistory);

module.exports = router;