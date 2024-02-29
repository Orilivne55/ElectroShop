const { Router } = require("express");
const {
  deleteOrder,
  updateOrder,
  getOrderById,
  getAllOrders,
  createOrder,
} = require("../controllers/order.controllers");
const { auth } = require("../middlewares/auth");
const router = Router()

router.post('/',auth,createOrder);

router.get('/',getAllOrders);

router.get('/:orderId',getOrderById);

router.put('/:orderId',updateOrder);

router.delete('/:orderId',deleteOrder);

module.exports = router;
